// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ username, onLogout }) {
  return (
    <div className="navbar">
      <div className="left">
        <span>Welcome {username}</span>
      </div>
      <div className="right">
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
