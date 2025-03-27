import { useState } from "react";
import SwipeCard from "./components/SwipeCard";
import RatingModal from "./components/RatingModal";

const mockUsers = [
  {
    id: 1,
    name: "Alex",
    bio: "Chill coder seeking a tidy roommate",
    videoUrl:
      "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
  },
  {
    id: 2,
    name: "Sam",
    bio: "Pet lover and foodie",
    videoUrl:
      "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_2mb.mp4",
  },
  {
    id: 3,
    name: "Jordan",
    bio: "Night owl gamer",
    videoUrl:
      "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_5mb.mp4",
  },
];

function App() {
  const [users, setUsers] = useState(mockUsers);
  const [lastDirection, setLastDirection] = useState("");
  const [showRating, setShowRating] = useState(false);
  const [lastSwipedUser, setLastSwipedUser] = useState(null);

  const onSwipe = (direction, userId) => {
    setLastDirection(direction);
    const swipedUser = users.find((user) => user.id === userId);
    setLastSwipedUser(swipedUser);
    setUsers(users.filter((user) => user.id !== userId));
    setShowRating(true);
  };

  const onRate = (rating) => {
    console.log(`Rated ${lastSwipedUser.name} ${rating}/5`);
    setShowRating(false);
  };

  const onCloseRating = () => {
    setShowRating(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-purple-600 mb-8">VibeRoom</h1>
      <div className="relative w-80 h-96">
        {users.map((user) => (
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
    </div>
  );
}

export default App;
