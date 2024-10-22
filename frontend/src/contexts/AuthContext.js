import React, { createContext, useState, useEffect } from 'react';
import { login, register, logout } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if there's a token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // TODO: Implement a function to validate the token and get user info
      const validateToken = async (token) => {
        try {
          const response = await fetch('/api/validate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
          });
          if (!response.ok) {
        throw new Error('Token validation failed');
          }
          const data = await response.json();
          return data.user;
        } catch (error) {
          console.error('Token validation error:', error);
          return null;
        }
      };

      validateToken(token).then((user) => {
        if (user) {
          setUser(user);
        } else {
          localStorage.removeItem('token');
        }
        setLoading(false);
      });
    }
    setLoading(false);
  }, []);

  const loginUser = async (email, password) => {
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      setUser(data.user);
      return data.user;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const registerUser = async (username, email, password) => {
    try {
      const data = await register(username, email, password);
      localStorage.setItem('token', data.token);
      setUser(data.user);
      return data.user;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    setUser(null);
    logout(); // Call the logout service if you have one
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, registerUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};