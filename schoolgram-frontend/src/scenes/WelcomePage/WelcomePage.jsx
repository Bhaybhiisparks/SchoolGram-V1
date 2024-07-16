import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';




//CUSTOM IMPORTS
// custom image imports
import welcomeLogo from "../../logo images/schoolgramwelcomelogo.svg"





const WelcomePage = () => {


  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5002/'); 
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Use useEffect to call fetchData when the component mounts
  useEffect(() => {
    fetchData();
  }, []); // The empty array ensures this runs only once when the component mounts

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;





    return( 
        <>
        {/* <body> */}
        <div className="welcomePage-div">
                <img src ={welcomeLogo} className="welcome-logo" alt="welcome-logo"/>
                     <div className="welcomePage-buttons">
                      <Link to = "/login" className="custom-link">
                      <button className="login-button">Login</button>
                      </Link>
                      <Link to = "/register" className="custom-link">
                      <button className="create-new-account">Create new account</button>
                      </Link>
                    </div>
                </div>
        {/* </body> */}
        </>

 
    )
}


export default WelcomePage;
