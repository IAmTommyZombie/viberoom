import { useRef } from "react";
import TinderCard from "react-tinder-card";
import { motion } from "framer-motion";

function SwipeCard({ user, onSwipe }) {
  const cardRef = useRef(null);
  const vibeScore = user.vibeScore || "N/A";

  const handlePass = async () => {
    await cardRef.current.swipe("left");
    onSwipe("left", user.id);
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
      preventSwipe={["up", "down"]}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-80 bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg"
      >
        <div className="relative">
          <video
            src={user.videoUrl}
            controls
            className="w-full h-48 rounded-lg mb-2"
          />
          <motion.div
            className="absolute top-2 left-2 text-2xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: user.lastSwipe === "left" ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-red-500">Passed</span>
          </motion.div>
          <motion.div
            className="absolute top-2 right-2 text-2xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: user.lastSwipe === "right" ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-green-500">Liked</span>
          </motion.div>
        </div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold">{user.name}</h3>
          <span className="text-sm text-gray-500 flex items-center">
            {vibeScore === "N/A" ? "No Ratings" : `${vibeScore}/5`}
            {vibeScore !== "N/A" && (
              <span className="ml-1 text-xl gradient-star">★</span>
            )}
          </span>
        </div>
        <p className="text-gray-600 mb-2">{user.bio}</p>
        <div className="text-sm text-gray-500 space-y-1">
          <p>
            <strong>Location:</strong> {user.location}
          </p>
          <p>
            <strong>Rent Range:</strong> {user.rentRange}
          </p>
          <p>
            <strong>Age:</strong> {user.age}
          </p>
          <p>
            <strong>Roommates:</strong> {user.roommates}
          </p>
          <p>
            <strong>Bedtime:</strong> {user.bedtime}
          </p>
          <p>
            <strong>Work Style:</strong> {user.workStyle}
          </p>
          <p>
            <strong>Food Prefs:</strong> {user.foodPrefs}
          </p>
          <p>
            <strong>Parking:</strong> {user.parking}
          </p>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePass}
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
          >
            Pass
          </button>
          <button
            onClick={handleInterested}
            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors"
          >
            Interested
          </button>
        </div>
      </motion.div>
    </TinderCard>
  );
}

export default SwipeCard;
