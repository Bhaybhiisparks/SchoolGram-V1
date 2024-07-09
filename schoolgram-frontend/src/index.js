import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { AuthProvider } from './context/authContext'; // Import the AuthProvider
// import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider

// const googleClientId = 'YOUR_GOOGLE_CLIENT_ID';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <GoogleOAuthProvider clientId={googleClientId}> */}
      <AuthProvider>
        <App />
      </AuthProvider>
    {/* </GoogleOAuthProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
