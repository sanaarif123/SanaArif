import React, { useState } from 'react'
import { Sidebar } from '../components/Sidebar'
import { VotesChart } from '../components/VoteChart'
import { CandidateList } from '../components/CandidateList'
import { VoteStats } from '../components/VoteStats'
const Dashboard = () => {

    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
      setIsDarkMode(!isDarkMode);
    };
  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
    <Sidebar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    
    <main className="flex-1 p-8">
      <VotesChart isDarkMode={isDarkMode}  />
      <CandidateList />
    </main>
    
    <VoteStats isDarkMode={isDarkMode}   />
  </div>
  )
}

export default Dashboard
