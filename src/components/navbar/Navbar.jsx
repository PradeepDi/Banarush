import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; 

function Navbar() {
  return (
    <div className="navbar">
      <div className="title">Banarush</div>
      <div className="nav-links">
      <Link to ="/Menu" className="nav-link">Menu</Link>
        <Link to ="/scoreboard" className="nav-link">Scoreboard</Link>
        <Link to="/instructions" className="nav-link">Instructions</Link>
        <Link to="/login" className="logout">Logout</Link>
      </div>
    </div>
  );
}

export default Navbar;
