// Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import './Form.css';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://resume2portfolio-backend.onrender.com/api/auth/login', { username, password });
      console.log(response.data);
      alert('Login successful!');
      if (response.data.message === "Login successful") {
        setUser(username); // Set the username in context
        navigate('/home');
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data.message : error.message);
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label><br />
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required /><br /><br />
        <label htmlFor="password">Password:</label><br />
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br /><br />
        <button type="submit">Login</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
      <div style={{ marginTop: '10px' }}>
        <p>Don't have an account? <Link to="/signup">Signup here</Link></p>
      </div>
    </div>
  );
};

export default Login;
