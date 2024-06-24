// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKjHVD_6csMYa4hIJkIomnVa5UdIhgNnQ",
  authDomain: "quiz-app-62702.firebaseapp.com",
  projectId: "quiz-app-62702",
  storageBucket: "quiz-app-62702.appspot.com",
  messagingSenderId: "950203825348",
  appId: "1:950203825348:web:1d82046995c1c8dbe01d91",
  measurementId: "G-B576RECXTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
