import React, { useState } from 'react';
import FormInput from '../../components/formInput/FormInput';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Register = () => {
  const [inputValues, setInputValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const inputs = [
    {
      id: 1,
      name: 'username',
      type: 'text',
      placeholder: 'Username',
    },
    {
      id: 2,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
    },
    {
      id: 3,
      name: 'password',
      type: passwordVisible ? 'text' : 'password',
      placeholder: 'Password',
      errorMessage:
        'Password should be 8-15 characters and include at least 1 letter, 1 number, 1 special character',
      pattern:
        '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,15}$',
      required: true,
    },
    {
      id: 4,
      name: 'confirmPassword',
      type: confirmPasswordVisible ? 'text' : 'password',
      placeholder: 'Confirm Password',
      errorMessage: "Password doesn't match",
      pattern: inputValues.password,
      required: true,
    },
  ];

  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Create user account using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        inputValues.email,
        inputValues.password
      );
      const user = userCredential.user;

      // Set the email in local storage
      localStorage.setItem('email', inputValues.email);

      // Add user data to Firestore, including an initial empty score
      await addDoc(collection(db, 'users'), {
        userId: user.uid,
        username: inputValues.username,
        email: inputValues.email,
        score: 0, 
      });

      console.log('Registration successful!');
      window.alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Error during registration:', error.message);
      window.alert('Email Already Exists or invalid details');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="register">
      <div className="gameName">
        <h1>Banarush</h1>
      </div>
      <form>
        <h2>Register</h2>
        {inputs.map((input) => (
          <div key={input.id} className="formInput">
            <FormInput 
              key={input.id} 
              {...input} 
              value={inputValues[input.name]}
              onChange={handleChange}
            />
            {input.name === 'password' || input.name === 'confirmPassword' ? (
              <div
                className="eyeIcon"
                onClick={
                  input.name === 'password'
                    ? togglePasswordVisibility
                    : toggleConfirmPasswordVisibility
                }
              >
                {input.name === 'password' ? (
                  passwordVisible ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )
                ) : confirmPasswordVisible ? (
                  <Visibility />
                ) : (
                  <VisibilityOff />
                )}
              </div>
            ) : null}
          </div>
        ))}
        <button type="submit" onClick={handleRegister}>
          Register
        </button>
        <div className="formLink">
          <span>Already have an account? </span>
          <Link to="/login" className="formSignup" style={{ textDecoration: 'none' }}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
