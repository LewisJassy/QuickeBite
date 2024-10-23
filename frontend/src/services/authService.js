import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/auth';

// function to handle login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, email, password });
    return response.data;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`);
    return response.data;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const getprofile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
} catch (error) {
    console.error('Profile error:', error);
    throw error;
  }
};

const AuthService = {
  login,
  register,
  logout,
  getprofile
};

export default AuthService;
