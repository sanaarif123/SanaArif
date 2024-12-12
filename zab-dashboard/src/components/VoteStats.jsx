export function VoteStats({ isDarkMode }) {
    console.log(isDarkMode);
    const candidates = [
      { id: 1, name: 'Candidate 1', votes: 23, totalVotes: 50, percentage: 23 },
      { id: 2, name: 'Candidate 2', votes: 45, totalVotes: 75, percentage: 45 },
      { id: 3, name: 'Candidate 3', votes: 78, totalVotes: 150, percentage: 52.5 },
    ];
  
    return (
      <div
        className={`w-80 p-6 border-l transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
      >
        {candidates.map((candidate) => (
          <div key={candidate.id} className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h3
                className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Candidate {candidate.id} Votes
              </h3>
              <span
                className={`text-sm px-2 py-1 rounded ${
                  isDarkMode
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                ↑ {candidate.percentage}%
              </span>
            </div>
            <div className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-gray-300' : ''}`}>
              {candidate.votes} votes
            </div>
            <div
              className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              {candidate.percentage}% ({candidate.votes} votes)
            </div>
            <div
              className={`w-full rounded-full h-2 ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}
            >
              <div
                className={`h-2 rounded-full ${
                  isDarkMode ? 'bg-gray-500' : 'bg-blue-500'
                }`}
                style={{ width: `${candidate.percentage}%` }}
              />
            </div>
            <div className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {candidate.totalVotes} votes
            </div>
          </div>
        ))}
  
        <div className="mt-8">
          <h3
            className={`text-lg font-semibold mb-4 ${
              isDarkMode ? 'text-gray-300' : ''
            }`}
          >
            Student Voting Status
          </h3>
          <div className={`text-center mb-4 ${isDarkMode ? 'text-gray-400' : ''}`}>
            100 students
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <span
                className={`w-3 h-3 rounded-full mr-2 ${
                  isDarkMode ? 'bg-gray-500' : 'bg-green-500'
                }`}
              />
              <span className={isDarkMode ? 'text-gray-400' : ''}>Voted: 75 students</span>
            </div>
            <div className="flex items-center text-sm">
              <span
                className={`w-3 h-3 rounded-full mr-2 ${
                  isDarkMode ? 'bg-gray-500' : 'bg-red-500'
                }`}
              />
              <span className={isDarkMode ? 'text-gray-400' : ''}>
                Not Voted: 25 students
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }