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
  const [seconds, setSeconds] = useState(40); // Start with 40 seconds
  const [audio] = useState(new Audio(audioFile));
  const [isMuted, setIsMuted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [options, setOptions] = useState([]);
  const [clickedButton, setClickedButton] = useState(null);
  const [level, setLevel] = useState(1);
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  // Fetch username on component load
  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setPlayerName(username);
    } else {
      fetchUsernameFromFirestore();
    }
  }, [navigate]);

  const fetchUsernameFromFirestore = async () => {
    try {
      const db = getFirestore();
      const email = localStorage.getItem('email'); 
      if (!email) {
        window.alert('User data not found. Please log in again.');
        navigate('/login');
        return;
      }

      const usersCollection = collection(db, 'users');
      const querySnapshot = await getDocs(usersCollection);

      // Find the document with the matching email
      const userDoc = querySnapshot.docs.find((doc) => doc.data().email === email);

      if (userDoc) {
        const { username } = userDoc.data();
        setPlayerName(username);
        localStorage.setItem('username', username); // Cache username for future use
      } else {
        window.alert('No user data found. Please log in again.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching username from Firestore:', error);
      window.alert('Failed to fetch user data. Please log in again.');
      navigate('/login');
    }
  };

  // Fetch the question image from the API
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

  // Background music handling
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

  // Timer logic
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

  // Start the new quest
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
//Generate unique 5 answers
  const generateOptions = (correctAnswer) => {
    const uniqueOptions = new Set([correctAnswer]);

    while (uniqueOptions.size < 5) {
      uniqueOptions.add(Math.floor(Math.random() * 10));
    }

    setOptions(Array.from(uniqueOptions).sort(() => Math.random() - 0.5));
  };
//Display status when answer clicked---------------------------------------------
  const handleOptionClick = (selectedOption) => {
    if (selectedOption === solution) {
      setClickedButton({ id: selectedOption, status: 'correct' });
      setNote('Correct!');
      updateScore(true);
      setTimeout(() => {
        setClickedButton(null);
        fetchImage();
        setSeconds((prev) => prev + 3);
        setLevel((prevLevel) => prevLevel + 1);
      }, 1000);
    } else {
      setClickedButton({ id: selectedOption, status: 'wrong' });
      setNote('Not Correct!');
      updateScore(false);
      setTimeout(() => setClickedButton(null), 1000);
    }
  };

  const updateScore = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 5);
    } else {
      setScore((prevScore) => Math.max(prevScore - 1, 0));
    }
  };
  //Save score to database event------------------------------------------------------------
  const saveScoreToDatabase = async (finalScore) => {
    try {
      const db = getFirestore();
      const scoresCollection = collection(db, 'scores');
      const userEmail = localStorage.getItem('email');
      const username = localStorage.getItem('username'); 

      const querySnapshot = await getDocs(scoresCollection);
      const userDoc = querySnapshot.docs.find((doc) => doc.data().userEmail === userEmail);

      if (userDoc) {
        // Update existing score record
        await updateDoc(doc(scoresCollection, userDoc.id), {
          score: finalScore,
          username, 
          timestamp: new Date(),
        });
      } else {
        // Add new score record
        await addDoc(scoresCollection, {
          userEmail,
          username, 
          score: finalScore,
          timestamp: new Date(),
        });
      }
    } catch (error) {
      console.error('Error saving/updating score to database:', error);
    }
  };
//game over event---------------------------------------------------------
  const handleGameOver = () => {
    saveScoreToDatabase(score);
    setIsGameOver(true);
  };
// handle mute -----------------------------------------------------------
  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

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
                  disabled={clickedButton !== null}
                >
                  {option}
                </button>
              ))}
            </div>
            <button className="mute-btn" onClick={handleMuteToggle}>
              {isMuted ? ' 🔇' : ' 🔊'}
            </button>
            <div className="display-bar">
              <p id="player">Player: {playerName}</p>
              <p id="timer">Timer: {seconds} s</p>
              <p id="score">Score: {score}</p>
              <p id="level">Level: {level}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BananaGame;
