// Import necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// Firebase configuration object with API keys and project details
const firebaseConfig = {
  apiKey: "AIzaSyDT47kg9xVa1YvgxoqazRjNHAuG2tgu9dQ",
  authDomain: "banarush-a2f00.firebaseapp.com",
  projectId: "banarush-a2f00",
  storageBucket: "banarush-a2f00.firebasestorage.app",
  messagingSenderId: "745931899293",
  appId: "1:745931899293:web:3db825c3e2a86eeec56f74",
  measurementId: "G-40SYK9CZJQ"
};

// Initialize Firebase app with the provided configuration
const app = initializeApp(firebaseConfig);

// Get Firestore instance for database operations
const db = getFirestore(app);

// Get Auth instance for user authentication
const auth = getAuth(app);
 
// Export the Auth and Firestore instances for use in other parts of the application
export { auth, db }; 


