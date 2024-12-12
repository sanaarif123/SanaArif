import { Home, Users, UserPlus, Settings, Moon } from 'lucide-react'
import {  Link } from 'react-router-dom';
import { useState } from 'react';

export function Sidebar({ isDarkMode, toggleTheme }) {
  
  return (
    <div className={`w-64 h-screen border-r flex flex-col shadow transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <div className="p-4 border-b">
        <h1 className="text-xl font-semibold">Zab Vote</h1>
      </div>
      
      <div className="flex flex-col flex-1">
        <div className="p-4">
          <h2 className="text-sm font-medium  mb-4">Main</h2>
          <nav className="space-y-2">
            <Link
              to="/" 
              className="flex items-center space-x-2  hover:bg-gray-100 p-2 rounded-lg"
            >
              <Home className="w-5 h-5" />
              <span>Homepage</span>
            </Link>
            <Link
              to="/user" 
              className="flex items-center space-x-2  hover:bg-gray-100 p-2 rounded-lg"
            >
              <Users className="w-5 h-5" />
              <span>Students</span>
            </Link>
            <Link
              to="/candidate" 
              className="flex items-center space-x-2  hover:bg-gray-100 p-2 rounded-lg"
            >
              <UserPlus className="w-5 h-5" />
              <span>Candidate</span>
            </Link>
          </nav>
        </div>
        
        <div className="p-4 mt-4">
          <h2 className="text-sm font-medium  mb-4">Maintenance</h2>
          <nav className="space-y-2">
            <Link 
              to="setting" 
              className="flex items-center space-x-2  hover:bg-gray-100 p-2 rounded-lg"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </nav>
        </div>
      </div>
      
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm">Developed by Hasan</span>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg" onClick={toggleTheme}>
            <Moon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

