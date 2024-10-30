// frontend/src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { login, register, logout as logoutService } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(JSON.parse(localStorage.getItem("authTokens")).token)
      : null
  );

  const [loading, setLoading] = useState(true);

  const loginUser = async (email, password) => {
    try {
      const data = await login(email, password);
      setAuthTokens(data);
      setUser(jwt_decode(data.token));
      localStorage.setItem("authTokens", JSON.stringify(data));
      api.defaults.headers["Authorization"] = `Bearer ${data.token}`;
      navigate("/"); // Redirect to dashboard or desired route
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const registerUser = async (username, email, password) => {
    try {
      const data = await register(username, email, password);
      setAuthTokens(data);
      setUser(jwt_decode(data.token));
      localStorage.setItem("authTokens", JSON.stringify(data));
      api.defaults.headers["Authorization"] = `Bearer ${data.token}`;
      navigate("/"); // Redirect to dashboard or desired route
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      await logoutService(); // Ensure backend handles token invalidation if necessary
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    api.defaults.headers["Authorization"] = null;
    navigate("/login"); // Redirect to login or desired route
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.token));
      api.defaults.headers["Authorization"] = `Bearer ${authTokens.token}`;
    }
    setLoading(false);
  }, [authTokens]);

  const contextData = {
    user,
    authTokens,
    loginUser,
    registerUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;