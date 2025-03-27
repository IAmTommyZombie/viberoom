function RatingModal({ user, onRate, onClose }) {
  const emojis = [
    { value: 1, icon: "😞" },
    { value: 2, icon: "😐" },
    { value: 3, icon: "😊" },
    { value: 4, icon: "👍" },
    { value: 5, icon: "🌟" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="mb-4 text-gray-800 text-lg font-semibold">
          How’s {user.name}’s vibe?
        </p>
        <div className="flex gap-4 justify-center">
          {emojis.map((emoji) => (
            <button
              key={emoji.value}
              onClick={() => onRate(emoji.value)}
              className="text-4xl hover:scale-125 transition-transform"
            >
              {emoji.icon}
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
