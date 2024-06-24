// src/SignUp.jsx
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';
import styled from 'styled-components';
import { TextField, Button, Typography } from '@mui/material';
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

const SignUpForm = styled(motion.div)`
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

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('User registered successfully!');
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Background>
      <SignUpForm
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FormTypography variant="h4" gutterBottom>
          Create an Account
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
          <StyledButton type="submit" variant="contained">
            Sign Up
          </StyledButton>
        </form>
      </SignUpForm>
    </Background>
  );
};

export default SignUp;
