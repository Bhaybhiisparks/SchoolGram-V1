import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context for authentication
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // function to check authentication status 
  //   const checkAuthStatus = async () => {
  //     try {
  //       const token = localStorage.getItem('token');
  //       console.log('Token', token);
  //       if (token) {
  //         //verify the token with the backend
  //           const response = await axios.get('http://localhost:5002/verify-frontend-token', {
  //           headers: { Authorization: `Bearer ${token}` },
  //         });
  //         setUser(response.data.user);
  //       } else {
  //         setUser(null);
  //       }
  //     } catch (error) {
  //       console.error('Error during authentication (verifying token or fetching user data):', error.response ? error.response.data : error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   checkAuthStatus();
  // }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:5002/login', credentials);
      const {data} = response;
      localStorage.setItem('token', data.data.token); // Store token in localStorage
      localStorage.setItem('user', JSON.stringify(data.data.user)); 
      setUser(data.data.user);
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
