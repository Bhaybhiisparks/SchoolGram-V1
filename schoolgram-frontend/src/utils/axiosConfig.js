// // I had to create this file to make sure that axios is correctly configured to include 
// // credentials (cookies) with each request. This issue came with trying to render profile data 
// // on the user's end


import axios from 'axios';

axios.defaults.withCredentials = true; // Enable sending cookies with requests
// // axios.defaults.baseURL = "http://localhost:3002/"; // Set the base URL for all requests


axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


export default axios;
