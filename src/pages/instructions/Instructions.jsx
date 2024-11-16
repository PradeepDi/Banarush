import React from 'react';
import { Link } from 'react-router-dom';
import './instructions.css';

const Instructions = () => {
  return (
    <div className="instructions">
      <div className="ifirst" />
      <h1 id="ia">Instructions</h1>
      <form id="instructForm">
        <h2 id="ib">Use below instruction to play the game</h2>
        <div className="iform-body">
          <h6 className="iform-title">Getting Started:</h6>
          <p className="iform-text">
            <ul>
              <li>
                To play the game you need to register using email address.
              </li>
              <li>
                After creating account, Please login using email adress and password
              </li>
              <li>
                After logged in you can play the game.
              </li>
            </ul>
          </p>

          <h6 className="iform-title">Description:</h6>
          <p className="iform-text">
          Welcome to Banarush. This game has 5 levels. Initially you get 60 seconds
           to solve the puzzle. When level up countdown time will be reduced.
            If you cant solve the puzzle within given time, game will beover.
             After 5 levels game will be finished.
          </p>
        </div>
        <label className="footer">Develop by Pradeep Dissanayaka</label>
      </form>

      <Link to="/"> {/* Link to the game page */}
          <button id="home-btn">Home</button>
      </Link>
    </div>
  )
}

export default Instructions;

