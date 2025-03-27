import { useState } from "react";

function RatingModal({ user, onRate, onClose }) {
  const [hoveredRating, setHoveredRating] = useState(0); // For hover effect

  const handleRate = (rating) => {
    onRate(rating);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="mb-4 text-gray-800 text-lg font-semibold">
          How’s {user.name}’s vibe?
        </p>
        <div className="flex gap-2 justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRate(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className={`text-3xl transition-colors ${
                hoveredRating >= star ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700"
        >
          Skip Rating
        </button>
      </div>
    </div>
  );
}

export default RatingModal;
