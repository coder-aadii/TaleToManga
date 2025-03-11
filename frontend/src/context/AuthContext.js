import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set auth token
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  };

  // Load user
  const loadUser = async () => {
    if (token) {
      setAuthToken(token);
      
      try {
        const res = await axios.get('/api/auth/me');
        setUser(res.data);
        setIsAuthenticated(true);
      } catch (err) {
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        setAuthToken(null);
      }
    }
    setLoading(false);
  };

  // Register user
  const register = async (formData) => {
    try {
      await axios.post('/api/auth/register', formData);
      // We don't set token or authenticate here because email verification is required
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      return false;
    }
  };

  // Login user
  const login = async (formData) => {
    try {
      const res = await axios.post('/api/auth/login', formData);
      setToken(res.data.token);
      setAuthToken(res.data.token);
      await loadUser();
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      return false;
    }
  };

  // Logout user
  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setAuthToken(null);
  };

  // Clear errors
  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        loading,
        user,
        error,
        register,
        login,
        logout,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 