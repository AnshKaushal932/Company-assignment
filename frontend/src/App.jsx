import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react'
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import './App.css'
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (username) => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Implement your logout logic, e.g., clearing localStorage
    localStorage.removeItem('token');
    setUsername('');
    setLoggedIn(false);
  };
  return (
    <Router>
      <div className="App">
        {loggedIn && <Navbar username={username} onLogout={handleLogout} />}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />}  />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
