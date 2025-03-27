import { useRef } from "react";
import TinderCard from "react-tinder-card";
import { motion } from "framer-motion";

function SwipeCard({ user, onSwipe }) {
  const cardRef = useRef(null);
  const vibeScore = user.vibeScore || "N/A";

  const handlePass = async () => {
    await cardRef.current.swipe("left"); // Ensure animation completes
    onSwipe("left", user.id); // Call after swipe
  };

  const handleInterested = async () => {
    await cardRef.current.swipe("right");
    onSwipe("right", user.id);
  };

  return (
    <TinderCard
      ref={cardRef}
      key={user.id}
      onSwipe={(dir) => onSwipe(dir, user.id)}
      className="absolute"
      preventSwipe={["up", "down"]} // Lock to left/right only
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-80 bg-white shadow-lg rounded-lg p-4"
      >
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
              <span className="ml-1 text-xl gradient-star">★</span>
            )}
          </span>
        </div>
        <p className="text-gray-600">{user.bio}</p>
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePass}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Pass
          </button>
          <button
            onClick={handleInterested}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Interested
          </button>
        </div>
      </motion.div>
    </TinderCard>
  );
}

export default SwipeCard;
