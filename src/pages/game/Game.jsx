import React, { useState, useEffect } from 'react';
import './game.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import GameOver from '../../components/gameover/GameOver'; 
import audioFile from '../../audioFile.mp3';
import { getFirestore, collection, addDoc, updateDoc, getDocs, doc } from 'firebase/firestore';
import { ReactSession } from 'react-client-session';
ReactSession.setStoreType('localStorage');

const BananaGame = () => {
  const [quest, setQuest] = useState('');
  const [solution, setSolution] = useState(-1);
  const [note, setNote] = useState('Choose the correct answer.');
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(30); // Start with 30 seconds
  const [audio] = useState(new Audio(audioFile));
  const [isMuted, setIsMuted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false); 
  const [options, setOptions] = useState([]);
  const [clickedButton, setClickedButton] = useState(null); // New state for button feedback
  const [level, setLevel] = useState(1); // New level state
  const navigate = useNavigate();

  const fetchImage = async () => {
    try {
      const response = await fetch('https://marcconrad.com/uob/banana/api.php');
      if (response.ok) {
        const data = await response.text();
        startQuest(data);
      } else {
        console.error('Failed to fetch image from the API.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  useEffect(() => {
    const handlePlay = () => {
      audio.loop = true;
      audio.volume = isMuted ? 0 : 1;
      audio.play();
    };
    const handleClick = () => {
      document.removeEventListener('click', handleClick);
      handlePlay();
    };
    document.addEventListener('click', handleClick);
    return () => {
      audio.pause();
      document.removeEventListener('click', handleClick);
    };
  }, [audio, isMuted]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds <= 0) {
        clearInterval(timer);
        handleGameOver();
      } else {
        setSeconds((prev) => prev - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

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

  const handleLogout = () => {
    ReactSession.set('isLogged', false);
    localStorage.removeItem('_react_session__');
    setNote('');
    setScore(0);
    setSeconds(30); // Reset to initial time
    navigate('/login');
  };

  const startQuest = (data) => {
    try {
      const parsed = JSON.parse(data);
      setQuest(parsed.question);
      setSolution(parsed.solution);
      generateOptions(parsed.solution);
      setNote('Choose the correct answer.');
    } catch (error) {
      console.error('Error parsing JSON response:', error);
    }
  };

  const generateOptions = (correctAnswer) => {
    const uniqueOptions = new Set([correctAnswer]);

    while (uniqueOptions.size < 5) { // 1 correct + 4 incorrect options
      uniqueOptions.add(Math.floor(Math.random() * 10));
    }

    setOptions(Array.from(uniqueOptions).sort(() => Math.random() - 0.5));
  };

  const handleOptionClick = (selectedOption) => {
    if (selectedOption === solution) {
      setClickedButton({ id: selectedOption, status: 'correct' });
      setNote('Correct!');
      updateScore(true);
      setTimeout(() => {
        setClickedButton(null); // Reset button state
        fetchImage();
        setSeconds((prev) => prev + 2); // Add 2 seconds for a correct answer
        setLevel((prevLevel) => prevLevel + 1); // Increment level on correct answer
      }, 1000); // Load next puzzle after 1 second
    } else {
      setClickedButton({ id: selectedOption, status: 'wrong' });
      setNote('Not Correct!');
      updateScore(false);
      setTimeout(() => setClickedButton(null), 1000); // Reset button state after 1 second
    }
  };

  const updateScore = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 5);
    } else {
      setScore((prevScore) => Math.max(prevScore - 1, 0));
    }
  };

  const saveScoreToDatabase = async (finalScore) => {
    try {
      const db = getFirestore();
      const scoresCollection = collection(db, 'scores');
      const userEmail = getCookie('email');
      const querySnapshot = await getDocs(scoresCollection);
      const userDoc = querySnapshot.docs.find(doc => doc.data().userEmail === userEmail);
      if (userDoc) {
        await updateDoc(doc(scoresCollection, userDoc.id), {
          score: finalScore,
        });
      } else {
        await addDoc(scoresCollection, {
          userEmail,
          score: finalScore,
          timestamp: new Date(),
        });
      }
    } catch (error) {
      console.error('Error saving/updating score to database:', error);
    }
  };

  const handleGameOver = () => {
    saveScoreToDatabase(score); 
    setIsGameOver(true);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  return (
    <div>
      <Navbar />
      <div className="bg">
        {isGameOver ? (
          <GameOver finalScore={score} handleTryAgain={() => navigate('/game')} />
        ) : (
          <>
            <div id="question-image">
              <img src={quest} alt="Question Image" id="quest" className="color-image" />
            </div>
            <p id="note">{note}</p>
            <div className="options-container">
              {options.map((option, index) => (
                <button
                  key={index}
                  className={`option-btn ${
                    clickedButton?.id === option ? clickedButton.status : ''
                  }`}
                  onClick={() => handleOptionClick(option)}
                  disabled={clickedButton !== null} // Disable buttons temporarily
                >
                  {option}
                </button>
              ))}
            </div>
            <button className="mute-btn" onClick={handleMuteToggle}>
              {isMuted ? ' 🔇' : ' 🔊'}
            </button>
            <div className="display-bar">
              <p id="timer">Timer : {seconds} s</p>
              <p id="score">Score : {score}</p>
              <p id="level">Level : {level}</p> {/* Display current level */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BananaGame;
