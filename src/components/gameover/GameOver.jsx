import React from 'react';
import { Link } from 'react-router-dom';
import './gameover.css'; 

const GameOver = ({ finalScore, handleTryAgain }) => {
  return (
    <div className="game-over">
      <form id="game-overForm">
      <h2>Game Over</h2>
      <p>Final score : {finalScore}</p>
      <button className="try-again-btn" onClick={handleTryAgain}>
        Play Again
      </button>
      <Link to="/" className= "back-to-home">Home</Link>
      </form>
    </div>
  );
};
export default GameOver;
