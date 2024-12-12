import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import User from './Pages/User';
import Candidate from './Pages/Candidate';
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
        </Route>
        <Route path="/user" element={<User />}>
        </Route>
        <Route path="/candidate" element={<Candidate />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
