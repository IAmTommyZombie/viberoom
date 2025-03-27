import { useState } from "react";
import TinderCard from "react-tinder-card";

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

  const onSwipe = (direction, userId) => {
    setLastDirection(direction);
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-purple-600 mb-8">VibeRoom</h1>
      <div className="relative w-80 h-96">
        {users.map((user) => (
          <TinderCard
            key={user.id}
            onSwipe={(dir) => onSwipe(dir, user.id)}
            className="absolute"
          >
            <div className="w-80 bg-white shadow-lg rounded-lg p-4">
              <video
                src={user.videoUrl}
                controls
                className="w-full h-48 rounded mb-2"
              />
              <h3 className="text-lg font-bold">{user.name}</h3>
              <p className="text-gray-600">{user.bio}</p>
              <div className="flex justify-between mt-4">
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Pass
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  Interested
                </button>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
      {lastDirection && (
        <p className="mt-4 text-gray-500">Swiped {lastDirection}</p>
      )}
    </div>
  );
}

export default App;
