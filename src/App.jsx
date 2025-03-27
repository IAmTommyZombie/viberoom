import { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import SwipeCard from "./components/SwipeCard";
import RatingModal from "./components/RatingModal";
import Matches from "./components/Matches";
import Login from "./components/Login";
import ProfileForm from "./components/ProfileForm";
import ChatList from "./components/ChatList";
import ChatProfile from "./components/ChatProfile";
import mockUsers from "./mockData";

function App() {
  const [users, setUsers] = useState(mockUsers);
  const [lastDirection, setLastDirection] = useState("");
  const [showRating, setShowRating] = useState(false);
  const [lastSwipedUser, setLastSwipedUser] = useState(null);
  const [matches, setMatches] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showMatch, setShowMatch] = useState(false);
  const [view, setView] = useState("swipe");
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState({}); // Track unread messages per match

  const onSwipe = (direction, userId) => {
    setLastDirection(direction);
    const swipedUser = users.find((user) => user.id === userId);
    setLastSwipedUser(swipedUser);
    setUsers(
      users
        .filter((user) => user.id !== userId)
        .map((user) => ({
          ...user,
          lastSwipe: user.id === userId ? direction : user.lastSwipe,
        }))
    );
    setShowRating(true);
    if (direction === "right" && Math.random() > 0.5) {
      const newMatch = { ...swipedUser, unread: 1 }; // Start with 1 unread message
      setMatches([...matches, newMatch]);
      setUnreadCounts((prev) => ({ ...prev, [swipedUser.id]: 1 }));
      setShowMatch(true);
      setTimeout(() => setShowMatch(false), 2500);
    }
  };

  const onRate = (rating) => {
    const updatedUsers = users.map((user) =>
      user.id === lastSwipedUser.id
        ? { ...user, vibeRatings: [...user.vibeRatings, rating] }
        : user
    );
    const updatedSwipedUser = {
      ...lastSwipedUser,
      vibeRatings: [...lastSwipedUser.vibeRatings, rating],
    };
    setUsers(updatedUsers);
    setLastSwipedUser(updatedSwipedUser);
    setMatches(
      matches.map((match) =>
        match.id === lastSwipedUser.id ? updatedSwipedUser : match
      )
    );
    console.log(`Rated ${lastSwipedUser.name} ${rating}/5`);
    setShowRating(false);
  };

  const onCloseRating = () => setShowRating(false);

  const handleLogin = (user) => {
    console.log("Logged in as:", user.email);
    setIsLoggedIn(true);
  };

  const handleSaveProfile = (profile) => {
    setCurrentUser(profile);
    setUsers((prev) => {
      const filtered = prev.filter((user) => user.id !== profile.id);
      return [profile, ...filtered];
    });
    setIsEditing(false);
  };

  const resetCards = () => {
    setUsers(mockUsers);
    setMatches([]);
    setUnreadCounts({});
    setLastDirection("");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setUsers(mockUsers);
    setMatches([]);
    setUnreadCounts({});
    setView("swipe");
  };

  const handleSelectMatch = (match) => {
    setSelectedMatch(match);
    setView("chatProfile");
  };

  const handleViewProfile = (match) => {
    setSelectedMatch(match);
    setView("fullProfile");
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleMarkRead = (matchId) => {
    setUnreadCounts((prev) => ({ ...prev, [matchId]: 0 }));
  };

  const totalUnread = Object.values(unreadCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  const enrichedUsers = users.map((user) => ({
    ...user,
    vibeScore:
      user.vibeRatings.length > 0
        ? (
            user.vibeRatings.reduce((sum, r) => sum + r, 0) /
            user.vibeRatings.length
          ).toFixed(1)
        : null,
  }));

  if (!isLoggedIn) return <Login onLogin={handleLogin} />;

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold text-purple-600 mb-8">VibeRoom</h1>
        <ProfileForm onSave={handleSaveProfile} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="fixed top-0 w-full max-w-md bg-white shadow-md p-4 flex justify-between z-10">
        <button
          onClick={() => setView("swipe")}
          className="text-purple-600 font-semibold hover:text-purple-800"
        >
          Swipe
        </button>
        <button
          onClick={() => setView("profile")}
          className="text-purple-600 font-semibold hover:text-purple-800"
        >
          Me
        </button>
        <div className="relative">
          <button
            onClick={() => setView("chats")}
            className="text-purple-600 font-semibold hover:text-purple-800"
          >
            Chats
          </button>
          {totalUnread > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalUnread}
            </span>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="text-red-500 font-semibold hover:text-red-700"
        >
          Logout
        </button>
      </div>
      <div className="mt-16 w-full max-w-md flex flex-col overflow-y-auto">
        {view === "swipe" && (
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold text-purple-600 mb-8 text-center">
              VibeRoom
            </h1>
            <div className="w-full mb-8">
              {enrichedUsers.length > 0 ? (
                enrichedUsers.map((user) => (
                  <SwipeCard key={user.id} user={user} onSwipe={onSwipe} />
                ))
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">No more cards to swipe!</p>
                  <button
                    onClick={resetCards}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
                  >
                    Reset Cards
                  </button>
                </div>
              )}
            </div>
            {lastDirection && enrichedUsers.length > 0 && (
              <p className="mb-4 text-gray-500 text-center">
                Swiped {lastDirection}
              </p>
            )}
            {showRating && (
              <RatingModal
                user={lastSwipedUser}
                onRate={onRate}
                onClose={onCloseRating}
              />
            )}
            {showMatch && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20"
              >
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                  />
                  <h2 className="text-3xl font-bold text-purple-600">
                    It’s a Match!
                  </h2>
                  <p className="mt-2 text-gray-600 text-lg">
                    You and {lastSwipedUser.name} vibe together!
                  </p>
                </div>
              </motion.div>
            )}
            <Matches matches={matches} />
          </div>
        )}

        {view === "profile" && (
          <div className="w-full bg-white p-6 rounded-lg shadow-lg">
            {isEditing ? (
              <ProfileForm
                onSave={handleSaveProfile}
                initialData={currentUser}
              />
            ) : (
              <>
                <h2 className="text-2xl font-bold text-purple-600 mb-4">
                  My Profile
                </h2>
                <video
                  src={currentUser.videoUrl}
                  controls
                  className="w-full h-48 rounded mb-4"
                />
                <h3 className="text-lg font-bold">{currentUser.name}</h3>
                <p className="text-gray-600 mb-2">{currentUser.bio}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p>
                    <strong>Location:</strong> {currentUser.location}
                  </p>
                  <p>
                    <strong>Rent Range:</strong> {currentUser.rentRange}
                  </p>
                  <p>
                    <strong>Age:</strong> {currentUser.age}
                  </p>
                  <p>
                    <strong>Gender:</strong> {currentUser.gender}
                  </p>
                  <p>
                    <strong>Roommates:</strong> {currentUser.roommates}
                  </p>
                  <p>
                    <strong>Bedtime:</strong> {currentUser.bedtime}
                  </p>
                  <p>
                    <strong>Work Style:</strong> {currentUser.workStyle}
                  </p>
                  <p>
                    <strong>Food Prefs:</strong> {currentUser.foodPrefs}
                  </p>
                  <p>
                    <strong>Parking:</strong> {currentUser.parking}
                  </p>
                </div>
                <button
                  onClick={handleEditProfile}
                  className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>
        )}

        {view === "chats" && (
          <ChatList matches={matches} onSelectMatch={handleSelectMatch} />
        )}
        {view === "chatProfile" && selectedMatch && (
          <ChatProfile
            match={selectedMatch}
            onBack={() => setView("chats")}
            onViewProfile={handleViewProfile}
            onMarkRead={handleMarkRead}
          />
        )}
        {view === "fullProfile" && selectedMatch && (
          <div className="w-full bg-white p-6 rounded-lg shadow-lg">
            <button
              onClick={() => setView("chatProfile")}
              className="text-purple-600 mb-4"
            >
              Back to Chat
            </button>
            <video
              src={selectedMatch.videoUrl}
              controls
              className="w-full h-48 rounded mb-4"
            />
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold">{selectedMatch.name}</h3>
              <span className="text-sm text-gray-500 flex items-center">
                {selectedMatch.vibeScore === "N/A"
                  ? "No Ratings"
                  : `${selectedMatch.vibeScore}/5`}
                {selectedMatch.vibeScore !== "N/A" && (
                  <span className="ml-1 text-xl gradient-star">★</span>
                )}
              </span>
            </div>
            <p className="text-gray-600 mb-2">{selectedMatch.bio}</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p>
                <strong>Location:</strong> {selectedMatch.location}
              </p>
              <p>
                <strong>Rent Range:</strong> {selectedMatch.rentRange}
              </p>
              <p>
                <strong>Age:</strong> {selectedMatch.age}
              </p>
              <p>
                <strong>Gender:</strong> {selectedMatch.gender}
              </p>
              <p>
                <strong>Roommates:</strong> {selectedMatch.roommates}
              </p>
              <p>
                <strong>Bedtime:</strong> {selectedMatch.bedtime}
              </p>
              <p>
                <strong>Work Style:</strong> {selectedMatch.workStyle}
              </p>
              <p>
                <strong>Food Prefs:</strong> {selectedMatch.foodPrefs}
              </p>
              <p>
                <strong>Parking:</strong> {selectedMatch.parking}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
