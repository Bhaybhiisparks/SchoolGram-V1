// // I had to create this file to make sure that axios is correctly configured to include 
// // credentials (cookies) with each request. This issue came with trying to render profile data 
// // on the user's end


import axios from 'axios';

axios.defaults.withCredentials = true; // Enable sending cookies with requests
// // axios.defaults.baseURL = "http://localhost:3002/"; // Set the base URL for all requests

export default axios;
