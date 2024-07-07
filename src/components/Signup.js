// Signup.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {  Link } from 'react-router-dom'; // Import useHistory and Link from react-router-dom
import './Form.css'; // Import your CSS file

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://resume2portfolio-backend.onrender.com/api/auth/signup', { username, password });
      console.log(response.data);
      alert('Signup successful!');
      
      // Optionally, redirect to login page or handle success in UI
      if (response.data.message === "User registered successfully") {
        navigate('/Home'); // Redirect to Home page upon successful signup
      } else {
        setErrorMessage('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error.response ? error.response.data.error : error.message);
      setErrorMessage('Signup failed. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Full Name:</label><br />
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required /><br /><br />
        <label htmlFor="password">Password:</label><br />
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br /><br />
        <button type="submit">Signup</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
      <div style={{ marginTop: '10px' }}>
        <p>Already have an account? <Link to="/">Sign in</Link></p>
      </div>
    </div>
  );
};

export default Signup;
