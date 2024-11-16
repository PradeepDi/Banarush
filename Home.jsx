import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
  return (
    <div className="home">
      <h1 id="a">Banarush</h1>
      <form id="homeForm">
        <Link to="/login">
          <button id="login-btn">Login</button>
        </Link>
        <Link to="/register">
          <button id="register-btn">Register</button>
        </Link>
        <Link to="/instructions">
          <button id="instructions-btn">Instructions</button>
        </Link>
      </form>
    </div>
  );
};

export default Home;

/* with preloader

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Preloader from '../../components/preloader/Preloader';
import './home.css';

const Home = () => {
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setContentLoaded(true);
    }, 1000); 

    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <div>
      {!contentLoaded ? (
        <Preloader />
      ) : (
        <div className="home">
          <h1 id="a">Banarush</h1>
          <form id="homeForm"> 
            <Link to="/login">
              <button id="login-btn">Login</button>
            </Link>
            <Link to="/register">
              <button id="register-btn">Register</button>
            </Link>
            <Link to="/instructions">
              <button id="instructions-btn">Instructions</button>
            </Link>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
*/ 
