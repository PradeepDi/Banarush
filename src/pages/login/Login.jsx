import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ReactSession } from 'react-client-session';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
ReactSession.setStoreType("localStorage");

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [toggleEye, setToggleEye] = useState(false);
  const [inputType, setInputType] = useState("password");

  const navigate = useNavigate();

  const handleToggle = () => {
    setToggleEye(!toggleEye);
    setInputType(inputType === "password" ? "text" : "password");
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );

      // Fetch user's username from Firestore and save it to localStorage
      const db = getFirestore();
      const usersCollection = collection(db, 'users');
      const querySnapshot = await getDocs(usersCollection);
      const userDoc = querySnapshot.docs.find((doc) => doc.data().email === inputs.email);

      if (userDoc) {
        const username = userDoc.data().username;
        localStorage.setItem('username', username); // Save username to localStorage
      }

      localStorage.setItem('email', inputs.email);
      localStorage.setItem('isLogged', 'true'); // Set logged-in session
      ReactSession.set("isLogged", true);
      window.alert('Login Successful');
      const user = userCredential.user;
      console.log(user);

      navigate("/Menu");
    } catch (error) {
      setInputType(false);
      console.error('Error:', error.message);
      window.alert('Email or password is wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="gameName">
        <h1>Banarush</h1>
      </div>
      <form>
        <h2>Login</h2>
        <div className="formInput">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="formInput">
          <input
            type={inputType}
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <div className="eyeIcon" onClick={handleToggle}>
            {toggleEye ? <Visibility /> : <VisibilityOff />}
          </div>
        </div>
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
        <div className="formLink">
          <span>Don't have an account? </span>
          <Link
            to="/register"
            className="formSignup"
            style={{ textDecoration: "none" }}
          >
            {" "}
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
