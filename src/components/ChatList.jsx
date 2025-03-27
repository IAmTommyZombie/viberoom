function ChatList({ matches, onSelectMatch }) {
  const mockMessages = {
    1: "Hey, love your coding vibe!",
    2: "Do you have pets? I’m obsessed!",
    3: "Late-night gaming sesh?",
    4: "What’s your favorite song?",
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold text-purple-600 mb-4">Chats</h2>
      {matches.length === 0 ? (
        <p className="text-gray-600">No matches yet—keep swiping!</p>
      ) : (
        matches.map((match) => (
          <div
            key={match.id}
            onClick={() => onSelectMatch(match)} 
            className="bg-white p-4 rounded-lg shadow-lg mb-2 cursor-pointer hover:bg-gray-100"
          >
            <h3 className="font-bold">{match.name}</h3>
            <p className="text-gray-600 text-sm">
              {mockMessages[match.id] || "Start chatting!"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default ChatList;
