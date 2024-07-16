import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context for authentication
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   // function to check authentication status 
  //   const checkAuthStatus = async () => {
  //     try {
  //       if (token){
  //         const {data} = response;
  //         const token = localStorage.getItem('token,', data.data.token);
  //         console.log('Token', data.data.token);
  //         // verify the token with the backend
  //         const response = await axios.get('http://localhost:5002/verify-token', {
  //           headers: { Authorization: `Bearer ${token}` },
  //                     }).then (response => {
  //                       setUser(data.data.user);
  //                       setLoading(false);
  //                     }).catch (error => {
  //                       console.error("Token verification failed:", error);
  //                       localStorage.removeItem("token");
  //                       setLoading(false);
  //                   });
  //                 } else {
  //                   setLoading(false);
  //                 }
  //               } catch (error) {
  //                 console.error("Error in useEffect:", error);
  //               } finally {
  //                 setLoading(false);
  //               }
  //        };

  //        checkAuthStatus();
  //       }, []);


  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        if (token) {
          console.log('Token', token);
          // Verify the token with the backend
          const response = await axios.get('http://localhost:5002/verify-frontend-token', {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log('Response from token verification:', response);

          // Assuming the response contains user data
          setUser(response.data.user);
        } else {
          // No token found, user is not authenticated
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);



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
    const {data} = response;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
