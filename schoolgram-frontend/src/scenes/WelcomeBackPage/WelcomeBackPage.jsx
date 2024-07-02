import React from "react";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";





//CUSTOM IMPORTS
// custom image imports
import arrowLeft from "../misc images/coloured/notification bing.svg"
import google from "../misc images/coloured/google icon.svg"
import show from "../misc images/black and white/eye-slash.svg"
import logo from "../../logo images/logo light.svg"
import welcomeLogo from "../../logo images/schoolgramwelcomelogo.svg"





const WelcomeBackPage = () => {

      const loginSchema = yup.object().shape({
        email: yup.string().email("invalid email").required("required"),
        password: yup.string().required("required"),
      })

      const initialValuesLogin = {
        email: "",
        password: "",
      };




     


      const Form = () =>{
        const {pageType, setPageType} = useState("login");
        // create your themes palette later on 
        // const {palatte} = useTheme();
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const loginPage = pageType == "login";
        const register = pageType == "register";

        // create a link to your css media query for 
        // ismobile (like the use in material UI)
        // ASK CHAT GPT TO rewrite this code 

        const validateForm = async (values, onSubmitProps) =>{
            if (loginPage) await login(values, onSubmitProps);
        };



        const login = async (values, onSubmitProps) => {
            const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            });
            const loggedIn = await loggedInResponse.json();
            onSubmitProps.resetForm();
            if (loggedIn) {
              dispatch(
                setLogin({
                  user: loggedIn.user,
                  token: loggedIn.token,
                })
              );
              navigate("/home");
            }
          };

    return ( 
        <>

        {/* <header>
            klh
        </header> */}


        <div className="welcome-back-page-img">
            <img src = {arrowLeft} alt="" className="go-back" />
            <img src = {logo} alt="" className="logo" />
            <img src={welcomeLogo} alt="" className="welcomeLogo" />
        </div>
       

            <div className="welcome-back-body" >
                <div className="welcome-back-div">
                <h4 className="welcome-back-name">Welcome Back!</h4>
                <h6 className="welcome-back-name2">Login to continue</h6>


                <Formik
                onSubmit = {validateForm}
                // initialValues = {loginPage ? initialValuesLogin : initialValuesRegister}
                // AuthenticateShcema = {loginPage? loginSchema: registrationSchema}
                >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    resetForm,
                }) =>(
                    <form action="" className="login-form" onSubmit={handleSubmit} >  
                        <input type="text" className="login-email" placeholder="Email" 
                        label="Email"
                        name = "email"
                        value = {values.email}/>
                        <input type="text" className="login-password" placeholder="Password"
                        label="Passowrd"
                        name="password"
                        value = {values.password} />
                        <img src = {show} className="hideNsee-password"/>

                        <div className="rememberNforget">
                            <div className="remember-box">
                            <input type="checkbox" className="remember-checkbox" />
                            <p className="remember-me-text">Remember me</p>
                            </div>
                            <p className="forgot-password"> <a href="" className="forget-link">Forgot password</a> </p>
                        </div>


                        {/* buttons */}
                        <div className="welcome-back-buttons">
                            <button className="login-button" type="submit">Login</button>
                            <button className="login-with-google" type="submit" >Login with Google</button>
                            <img src = {google} alt="" className="google-img" />
                        </div>
                    
                        <p className="dont-have-an-account">Don't have an account? <a href="" className="create-new-acct-link">Create new account!</a> </p>


                    {/* {loginPage ? "login" : "register"}
                    resetForm() */}
                    </form>
                )}


                </Formik>
                
                </div>
            </div>
                </>

 
    )
}

}

export default WelcomeBackPage;
