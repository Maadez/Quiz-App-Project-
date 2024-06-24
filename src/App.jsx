import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./Login";
import SignUp from "./SignUp"; // Import the SignUp component
import { useQuestions } from "./context/QuestionsProvider";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import FinishScreen from "./components/FinishScreen";
import Header from './components/Header'

const QuizApp = () => {
  const { status } = useQuestions();

  return (
    <div className="text-textColor">
      <Header />
      <div className="flex min-h-[calc(100vh-70px)] items-center justify-center">
        {status === "pending" && <StartScreen />}
        {status === "active" && <Question />}
        {status === "finished" && <FinishScreen />}
      </div>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <nav>
        {user ? (
          <Link to="/"></Link>
        ) : (
          <>
            <Link to="/login"></Link>
            <Link to="/signup"></Link> {/* Add SignUp link in navigation */}
          </>
        )}
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> {/* Define route for SignUp */}
        <Route path="/" element={user ? <QuizApp /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
