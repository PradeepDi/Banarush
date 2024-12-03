import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './menu.css';
import { ReactSession } from 'react-client-session';
ReactSession.setStoreType('localStorage');

const Menu = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const onPageLoad = () => {
      var isLogged = ReactSession.get('isLogged');
      if (!isLogged) {
        window.alert('Not Logged In');
        navigate('/login');
      }
    };
    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad, false);
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, []);

  return (
    <div className="menu">
      <h1 id="b">Banarush</h1>
    <form id="menuForm">
      <Link to="/game">
        <button id="Play-btn">Play</button>
      </Link>
      <Link to="/scoreboard">
        <button id="score-btn">Scoreboard</button>
      </Link>
      <Link to="/">
        <button id="Home-btn">Home</button>
      </Link>
    </form>
  </div>
  )
}

export default Menu;