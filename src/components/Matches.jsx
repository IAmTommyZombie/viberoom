function Matches({ matches }) {
  return (
    <div className="w-full mt-4">
      <h2 className="text-xl font-bold text-purple-600 mb-2">Your Matches</h2>
      {matches.length === 0 ? (
        <p className="text-gray-600">No matches yet—keep swiping!</p>
      ) : (
        <ul className="space-y-2">
          {matches.map((match) => (
            <li key={match.id} className="bg-white p-3 rounded-lg shadow-sm">
              {match.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Matches;
