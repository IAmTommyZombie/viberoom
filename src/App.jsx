import { useState } from "react";
import SwipeCard from "./components/SwipeCard";
import RatingModal from "./components/RatingModal";
import Matches from "./components/Matches";
import Login from "./components/Login";

const mockUsers = [
  {
    id: 1,
    name: "Alex",
    bio: "Chill coder seeking a tidy roommate",
    videoUrl:
      "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    vibeRatings: [],
  },
  {
    id: 2,
    name: "Sam",
    bio: "Pet lover and foodie",
    videoUrl:
      "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_2mb.mp4",
    vibeRatings: [],
  },
  {
    id: 3,
    name: "Jordan",
    bio: "Night owl gamer",
    videoUrl:
      "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_5mb.mp4",
    vibeRatings: [],
  },
];

function App() {
  const [users, setUsers] = useState(mockUsers);
  const [lastDirection, setLastDirection] = useState("");
  const [showRating, setShowRating] = useState(false);
  const [lastSwipedUser, setLastSwipedUser] = useState(null);
  const [matches, setMatches] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onSwipe = (direction, userId) => {
    setLastDirection(direction);
    const swipedUser = users.find((user) => user.id === userId);
    setLastSwipedUser(swipedUser);
    setUsers(users.filter((user) => user.id !== userId));
    setShowRating(true);
    if (direction === "right" && Math.random() > 0.5) {
      setMatches([...matches, swipedUser]);
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

  const onCloseRating = () => {
    setShowRating(false);
  };

  const handleLogin = (user) => {
    console.log("Logged in as:", user.email);
    setIsLoggedIn(true);
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

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 to-blue-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-purple-600 mb-8">VibeRoom</h1>
      <div className="relative w-80 h-96">
        {enrichedUsers.map((user) => (
          <SwipeCard key={user.id} user={user} onSwipe={onSwipe} />
        ))}
      </div>
      {lastDirection && (
        <p className="mt-4 text-gray-500">Swiped {lastDirection}</p>
      )}
      {showRating && (
        <RatingModal
          user={lastSwipedUser}
          onRate={onRate}
          onClose={onCloseRating}
        />
      )}
      <Matches matches={matches} />
    </div>
  );
}

export default App;
