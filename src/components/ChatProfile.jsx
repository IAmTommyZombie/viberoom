import { useState, useEffect } from "react";

function ChatProfile({ match, onBack, onViewProfile, onMarkRead }) {
  const vibeScore =
    match.vibeRatings.length > 0
      ? (
          match.vibeRatings.reduce((sum, r) => sum + r, 0) /
          match.vibeRatings.length
        ).toFixed(1)
      : "N/A";
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey, we matched!",
      fromMe: false,
      timestamp: Date.now() - 120000,
      unread: true,
    },
    {
      id: 2,
      text: "Yeah, your vibe’s awesome!",
      fromMe: true,
      timestamp: Date.now() - 60000,
      unread: false,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Mark messages as read when the chat is opened
    const updatedMessages = messages.map((msg) => ({ ...msg, unread: false }));
    setMessages(updatedMessages);
    onMarkRead(match.id); // Notify parent to update unread count
  }, [match.id, onMarkRead]);

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now(),
          text: newMessage,
          fromMe: true,
          timestamp: Date.now(),
          unread: false,
        },
      ]);
      setNewMessage("");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: "Thanks! You too!",
            fromMe: false,
            timestamp: Date.now(),
            unread: true,
          },
        ]);
      }, 1000);
    }
  };

  const formatTimestamp = (timestamp) => {
    const diff = (Date.now() - timestamp) / 1000 / 60; // Minutes ago
    if (diff < 1) return "Just now";
    if (diff < 60) return `${Math.floor(diff)} min ago`;
    return `${Math.floor(diff / 60)} hr ago`;
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg flex flex-col h-[80vh]">
      <button onClick={onBack} className="text-purple-600 mb-4">
        Back to Chats
      </button>
      <div className="flex justify-between items-center mb-4">
        <h3
          onClick={() => onViewProfile(match)}
          className="text-lg font-bold text-purple-600 cursor-pointer hover:underline"
        >
          {match.name}
        </h3>
        <span className="text-sm text-gray-500 flex items-center">
          {vibeScore === "N/A" ? "No Ratings" : `${vibeScore}/5`}
          {vibeScore !== "N/A" && (
            <span className="ml-1 text-xl gradient-star">★</span>
          )}
        </span>
      </div>
      <video
        src={match.videoUrl}
        controls
        className="w-full h-48 rounded mb-4"
      />
      <p className="text-gray-600 mb-4">{match.bio}</p>
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 mb-2 rounded-lg ${
              msg.fromMe ? "bg-purple-100 ml-auto" : "bg-gray-100 mr-auto"
            } max-w-[70%]`}
          >
            <p>{msg.text}</p>
            <p className="text-xs text-gray-400">
              {formatTimestamp(msg.timestamp)}
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatProfile;
