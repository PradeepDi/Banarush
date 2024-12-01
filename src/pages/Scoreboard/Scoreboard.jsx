import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './scoreboard.css';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { ReactSession } from 'react-client-session';
ReactSession.setStoreType('localStorage');

const Scoreboard = () => {
  const [userScores, setUserScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const onPageLoad = async () => {
      var isLogged = ReactSession.get('isLogged');
      if (!isLogged) {
        window.alert('Not Logged In');
        navigate('/login');
        return;
      }

      try {
        // Fetch all user scores from Firestore
        const usersCollection = collection(db, 'scores');
        const usersSnapshot = await getDocs(usersCollection);

        const scores = [];
        usersSnapshot.forEach((doc) => {
          const userData = doc.data();
          scores.push({ username: userData.username, score: userData.score });
        });

        scores.sort((a, b) => b.score - a.score);

        setUserScores(scores);
      } catch (error) {
        console.error('Error fetching user scores:', error.message);
      }
    };

    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad, false);
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, [navigate]);

   return (
    <div className="scoreboard">
      <form id="scoreboardForm">
        <h2 id="topic">Scoreboard</h2>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {userScores.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/game">
          <button id="back-btn">Back</button>
        </Link>
      </form>
    </div>
  );
};

export default Scoreboard;
