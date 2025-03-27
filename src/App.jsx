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

const mockUsers = [
  {
    id: 1,
    name: "Alex",
    bio: "Chill coder seeking a tidy roommate",
    videoUrl:
      "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    vibeRatings: [4, 5],
  },
  {
    id: 2,
    name: "Sam",
    bio: "Pet lover and foodie",
    videoUrl:
      "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_2mb.mp4",
    vibeRatings: [3, 4],
  },
  {
    id: 3,
    name: "Jordan",
    bio: "Night owl gamer",
    videoUrl:
      "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_5mb.mp4",
    vibeRatings: [5, 5],
  },
  {
    id: 4,
    name: "Taylor",
    bio: "Music lover and early riser",
    videoUrl:
      "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_10mb.mp4",
    vibeRatings: [4, 4],
  },
];

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

  const onSwipe = (direction, userId) => {
    setLastDirection(direction);
    const swipedUser = users.find((user) => user.id === userId);
    setLastSwipedUser(swipedUser);
    setUsers(users.filter((user) => user.id !== userId));
    setShowRating(true);
    if (direction === "right" && Math.random() > 0.5) {
      setMatches([...matches, swipedUser]);
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
    setUsers([profile, ...users]);
  };

  const resetCards = () => {
    setUsers(mockUsers);
    setMatches([]);
    setLastDirection("");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setUsers(mockUsers);
    setMatches([]);
    setView("swipe");
  };

  const handleSelectMatch = (match) => {
    setSelectedMatch(match);
    setView("chatProfile"); // Switch to profile view
  };

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
      <div className="min-h-screen bg-gradient-to-b from-purple-200 to-blue-200 flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold text-purple-600 mb-8">VibeRoom</h1>
        <ProfileForm onSave={handleSaveProfile} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 to-blue-200 flex flex-col items-center p-4">
      <div className="flex justify-between w-full max-w-md mb-4">
        <button
          onClick={() => setView("swipe")}
          className="text-purple-600 font-bold"
        >
          Swipe
        </button>
        <button
          onClick={() => setView("profile")}
          className="text-purple-600 font-bold"
        >
          Me
        </button>
        <button
          onClick={() => setView("chats")}
          className="text-purple-600 font-bold"
        >
          Chats
        </button>
        <button onClick={handleLogout} className="text-red-500 font-bold">
          Logout
        </button>
      </div>

      {view === "swipe" && (
        <>
          <h1 className="text-4xl font-bold text-purple-600 mb-8">VibeRoom</h1>
          <div className="relative w-80 h-96">
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
            <p className="mt-4 text-gray-500">Swiped {lastDirection}</p>
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
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
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
        </>
      )}

      {view === "profile" && (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">
            My Profile
          </h2>
          <video
            src={currentUser.videoUrl}
            controls
            className="w-full h-48 rounded mb-2"
          />
          <h3 className="text-lg font-bold">{currentUser.name}</h3>
          <p className="text-gray-600">{currentUser.bio}</p>
        </div>
      )}

      {view === "chats" && (
        <ChatList matches={matches} onSelectMatch={handleSelectMatch} />
      )}
      {view === "chatProfile" && selectedMatch && (
        <ChatProfile match={selectedMatch} onBack={() => setView("chats")} />
      )}
    </div>
  );
}

export default App;
