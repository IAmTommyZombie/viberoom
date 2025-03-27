import { useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "Alex",
    bio: "Chill coder looking for a tidy roommate",
    videoUrl:
      "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4", // Placeholder
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">VibeRoom</h1>
      <div className="w-80 bg-white shadow-lg rounded-lg p-4">
        <video
          src={currentUser.videoUrl}
          controls
          className="w-full h-48 rounded mb-2"
        />
        <h3 className="text-lg font-bold">{currentUser.name}</h3>
        <p className="text-gray-600">{currentUser.bio}</p>
        <div className="flex justify-between mt-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Pass
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Interested
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
