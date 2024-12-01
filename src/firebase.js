// Import necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// Firebase configuration object with API keys and project details
const firebaseConfig = {
  apiKey: "AIzaSyCby0zXsmN8Nu6NFnNkA1z2N9sAzYgH38g",
  authDomain: "banarush-93864.firebaseapp.com",
  projectId: "banarush-93864",
  storageBucket: "banarush-93864.firebasestorage.app",
  messagingSenderId: "934861258713",
  appId: "1:934861258713:web:aa3aa5d37e0acb48c023c8",
  measurementId: "G-XGMVVHS2SC"
};

// Initialize Firebase app with the provided configuration
const app = initializeApp(firebaseConfig);

// Get Firestore instance for database operations
const db = getFirestore(app);

// Get Auth instance for user authentication
const auth = getAuth(app);
 
// Export the Auth and Firestore instances for use in other parts of the application
export { auth, db }; 

















/*// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCby0zXsmN8Nu6NFnNkA1z2N9sAzYgH38g",
  authDomain: "banarush-93864.firebaseapp.com",
  projectId: "banarush-93864",
  storageBucket: "banarush-93864.firebasestorage.app",
  messagingSenderId: "934861258713",
  appId: "1:934861258713:web:aa3aa5d37e0acb48c023c8",
  measurementId: "G-XGMVVHS2SC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


apiKey: "AIzaSyATXERMiwp7Qbe9hg5RCeEZQcppzmOOIbU",
  authDomain: "numato-login-registration.firebaseapp.com",
  projectId: "numato-login-registration",
  storageBucket: "numato-login-registration.appspot.com",
  messagingSenderId: "717131922357",
  appId: "1:717131922357:web:52b77b9816f96427c237fc"

*/