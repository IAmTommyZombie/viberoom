import TinderCard from "react-tinder-card";

function SwipeCard({ user, onSwipe }) {
  // Mock vibe score for now - we'll calculate this later
  const vibeScore = user.vibeScore || "N/A";

  return (
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
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold">{user.name}</h3>
          <span className="text-sm text-gray-500 flex items-center">
            {vibeScore === "N/A" ? "No Ratings" : `${vibeScore}/5`}
            {vibeScore !== "N/A" && (
              <span className="ml-1 text-yellow-400">★</span>
            )}
          </span>
        </div>
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
  );
}

export default SwipeCard;
