function Matches({ matches }) {
    return (
      <div className="w-80 mt-8">
        <h2 className="text-xl font-bold text-purple-600 mb-4">Your Matches</h2>
        {matches.length === 0 ? (
          <p className="text-gray-500">No matches yet—keep swiping!</p>
        ) : (
          matches.map(match => (
            <div key={match.id} className="bg-white p-4 rounded-lg shadow-lg mb-2">
              <h3 className="font-bold">{match.name}</h3>
              <p className="text-gray-600">{match.bio}</p>
              <button className="mt-2 text-sm text-purple-600 hover:text-purple-800">
                Chat (coming soon!)
              </button>
            </div>
          ))
        )}
      </div>
    );
  }
  
  export default Matches;