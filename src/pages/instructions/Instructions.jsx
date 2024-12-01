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
          Welcome to Banarush. This game has many levels. Initially you get 30 seconds
           to solve the puzzle. For each correct answer 2 seconds will be added and level will be increased.
           If you select wrong answer 1 mark will be deducted.
            If you can't solve the puzzle within given time, game will be over.
          </p>
        </div>
        <label className="footer">Develop by Pradeep Dissanayaka (UOB Student ID - 2423350)</label>
      </form>

      <Link to="/"> {/* Link to the game page */}
          <button id="home-btn">Home</button>
      </Link>
    </div>
  )
}

export default Instructions;

