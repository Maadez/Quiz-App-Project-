import { useNavigate, Link } from 'react-router-dom';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';
import styled, { keyframes } from 'styled-components';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #0077b6 0%, #00b4d8 100%);
  overflow: hidden;
  width: 100vw;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  position: relative;
`;

const LoginForm = styled(motion.div)`
  background: white;
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 400px;
  position: relative;
  z-index: 2;
`;

const StyledButton = styled(Button)`
  margin-top: 30px;
  padding: 10px;
  width: 100%;
  background: linear-gradient(135deg, #005f99 0%, #0088cc 100%);
  color: white;
  transition: transform 0.2s, background 0.2s;
  &:hover {
    background: linear-gradient(135deg, #004c8c 0%, #0077b6 100%);
    transform: scale(1.05);
  }
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    fieldset {
      border-color: #005f99;
    }
    &:hover fieldset {
      border-color: #004c8c;
    }
    &.Mui-focused fieldset {
      border-color: #00aaff;
    }
  }
  margin-top: 20px;
  width: 100%;
`;

const FormTypography = styled(Typography)`
  margin-bottom: 30px;
  color: #005f99;
`;

const ErrorTypography = styled(Typography)`
  margin-top: 20px;
  color: #d32f2f;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const starAnimation = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0);
    opacity: 0;
  }
`;

const Star = styled.div`
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  animation: ${starAnimation} 2s infinite;
`;

const generateStars = (numStars) => {
  const stars = [];
  for (let i = 0; i < numStars; i++) {
    const size = Math.random() * 2 + 1;
    const duration = Math.random() * 2 + 1;
    const delay = Math.random() * 2;
    const top = Math.random() * 100;
    const left = Math.random() * 100;

    stars.push(
      <Star
        key={i}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: `${top}%`,
          left: `${left}%`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      />
    );
  }
  return stars;
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      navigate('/');
    } catch (error) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Background>
      {generateStars(100)}
      <LoginForm
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FormTypography variant="h4" gutterBottom>
          QuizFlix
        </FormTypography>
        <FormTypography variant="subtitle1" gutterBottom>
          Please login to your account
        </FormTypography>
        <form onSubmit={handleSubmit}>
          <StyledTextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: '20px' }}
          />
          <StyledTextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: '30px' }}
          />
          {isLoading ? (
            <LoadingWrapper>
              <CircularProgress />
            </LoadingWrapper>
          ) : (
            <>
              {error && <ErrorTypography color="error">{error}</ErrorTypography>}
              <StyledButton type="submit" variant="contained">
                Login
              </StyledButton>
              <Typography variant="body2" style={{ marginTop: '20px' }}>
                Don't have an account? <Link to="/SignUp" style={{ color: '#005f99' }}>Sign Up</Link>
              </Typography>
            </>
          )}
        </form>
        <FormTypography variant="h4" gutterBottom style={{ marginTop: '30px' }}>
          Advanced Web Development
        </FormTypography>
        <FormTypography variant="subtitle1" gutterBottom>
      
        </FormTypography>
      </LoginForm>
    </Background>
  );
};

export default Login;
