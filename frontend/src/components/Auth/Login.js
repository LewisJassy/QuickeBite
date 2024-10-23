import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import Hero from '../Hero'; // Import the Hero component
import './Login.css'; // Import your CSS file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div>
      <Hero title="Login" /> {/* Add Hero with "Login" as the title */}
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <p style={{ color: 'red'}}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;