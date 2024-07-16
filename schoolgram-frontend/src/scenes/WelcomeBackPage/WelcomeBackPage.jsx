import React, { useContext } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AuthContext } from '../../context/authContext';
// import { useDispatch } from "react-redux";
// import Dropzone from "react-dropzone";






//CUSTOM IMPORTS
// custom image imports
import arrowLeft from "../misc images/coloured/notification bing.svg"
import google from "../misc images/coloured/google icon.svg"
import show from "../misc images/black and white/eye-slash.svg"
import logo from "../../logo images/logo light.svg"
import welcomeLogo from "../../logo images/schoolgramwelcomelogo.svg"
import SearchHeader from "../../components/SearchHeader";





const WelcomeBackPage = () => {

    const navigate = useNavigate(); 
    const { user, setUser, loading, login } = useContext(AuthContext); 

    console.log('AuthContext:', useContext(AuthContext));

    if (!setUser) {
        console.error('setUser is not available in context');
    }

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const onSubmit = async (values, { setSubmitting, setStatus }) => {
        try {
            const response = await axios.post('http://localhost:5002/login', values, {                       
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log('API Response:', response); 
            console.log(response.data.data.user);
            console.log(response.data.data.token);
            
            setStatus({ message: response.data.message });

            const { user, token } = response.data.data; 
            if (token) {
                console.log('Token received:', token);
                // Save token to local storage 
                localStorage.setItem('token', token);
    
                // Debugging: Log token from local storage
                const storedToken = localStorage.getItem('token');
                console.log('Token stored in local storage:', storedToken);
            } else {
                console.log('No token received in response data.');
            }

            if (user) {
            setUser(user); 
            console.log('Navigating to user profile:', `/${user._id}`); // Debugging
            // Redirect to the profile page
            navigate(`/${user._id}`); 
            } else {
                setStatus({ message: "User not found. Please create an account." });
                // Redirect to a login if user data is not available
                navigate('/register'); 
            }

        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 200 range
                setStatus({ message: error.response.data.message });
            } else if (error.request) {
                // Request was made but no response received
                setStatus({ message: "No response from server. Please try again later." });
            } else {
                // Something happened in setting up the request
                setStatus({ message: "Error: " + error.message });
            }
        }
            setSubmitting(false);
    };

     

    return ( 
        <>
        {/* <SearchHeader /> */}


                    <div className="welcome-back-body">
                        <div className="welcome-back-page-img">
                            <img src = {arrowLeft} alt="" className="go-back" />
                            <img src = {logo} alt="" className="logo" />
                            {/* <img src={welcomeLogo} alt="" className="welcomeLogo" /> */}
                        </div>
            
                        <div className="welcome-back-div">
                        <h4 className="welcome-back-name">Welcome Back!</h4>
                        <h6 className="welcome-back-name2">Login to continue</h6>                
                        </div>
                    
                    </div>
                       

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({
                    handleSubmit,
                    isSubmitting,
                    status
                }) => (                   
                    <Form className="login-form" onSubmit={handleSubmit} >  


                                            {/* <label>Email:</label> */}
                                             <Field 
                                             type="text" 
                                             className="welcomebacklogin-email" 
                                             placeholder="Email" 
                                            //  label="Email"
                                             name = "email"
                                             required
                                             />
                                             <ErrorMessage name="email" component="div" className="error-message" />

                                            {/* <label>Password:</label> */}
                                            <Field 
                                            type="password" 
                                            className="welcomebacklogin-password" 
                                            placeholder="Password"
                                            // label="Password"
                                            name="password"
                                            />
                                            <ErrorMessage name="password" component="div" className="error-message" />
                                            <img src = {show} className="hideNsee-password"/>
                    
                                            <div className="rememberNforget">
                                                <div className="remember-box">
                                                <input type="checkbox" className="remember-checkbox" />
                                                <p className="remember-me-text">Remember me</p>
                                                </div>
                                                <p className="forgot-password"> <a href="" className="forget-link">Forgot password</a> </p>
                                            </div>
                    
                    
                                            {/* BUTTONS */}
                                             <div className="welcome-back-buttons">
                                                 <button 
                                                 className="login-button"
                                                  type="submit" 
                                                  disabled={isSubmitting} >Login</button>
                                                 <button 
                                                 className="login-with-google" 
                                                 type="submit" >Login with Google</button>
                                                 <img src = {google} alt="" className="google-img" />
                                             </div>
                                        
                                             <div className="dont-have-an-account" >
                                                <p>Don't have an account?</p>
                                             <Link to = "/register" className="custom-link"> 
                                                      <a href="" className="create-new-acct-link">Create new account!</a>
                                                     </Link>
                                             </div>
                                             
                                                    
                                                





                                                 {status && status.message && (
                            <div 
                                style={{
                                    position: 'fixed',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    padding: '20px',
                                    backgroundColor: 'white',
                                    border: '2px solid white',
                                    borderRadius: '2vw',
                                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                                    zIndex: 1000,
                                }}
                            >
                                <p style={{ margin: 0 }}>{status.message}</p>
                            </div>
                        )}
                    
                                                 {/* {status && status.message && <p>{status.message}</p>} */}

                      </Form>   
                )}
            </Formik>

                </>
 
    );

};


export default WelcomeBackPage;



