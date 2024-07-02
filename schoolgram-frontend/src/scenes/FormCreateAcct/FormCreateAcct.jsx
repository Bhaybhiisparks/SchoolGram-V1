import React, {useState} from "react";



//CUSTOM IMPORTS
// custom image imports
import logo from "../../logo images/logo light.svg"
import arrowLeft from "../misc images/coloured/tick-circle.svg"
import mustContain from "../../password images/Property 1=Short (1).svg"
import errorUppercase from "../../password images/success-uppercase.svg"
import errorLowercase from "../../password images/error-lowercase.svg"
import errorSymbol from "../../password images/error-symbol.svg"
import errorNumber from "../../password images/error-number.svg"


//CUSTOM FILE IMPORTS
// import Togglescreen from "../../components/Togglescreen";
import SearchHeader from "../../components/SearchHeader";


//misc imports
// form handling and validation
import { Formik } from "formik";
// validation library
import * as yup from "yup";
// navigate when they register and login 
import {useNavigate} from "react-router-dom";
// use react redux to strore information
import { useDispatch } from "react-redux";
// set login when the user logs in 
// recheck this code
import {setLogin} from "state";
//file upload
import Dropzone from "react-dropzone";

// detect mobile view and attach corresponding mediaQuery else attach desktop view
// create a separate JSX file for this and import and call it into this file for readablity
// and for the fact that you need it in every jsx scene file
// ask chatGPT if this use  is correct
// const detectScreen = Togglescreen();
  
  



const FormCreateAcct = () => {


    const registrationSchema = 
    // yup validation schema, determining how the library will store the state
        yup.object().shape({
        firstName: yup.string().required("required"),
        lastName: yup.string().required("required"),
        institution: yup.string().required("required"),
        department: yup.string().required("required"),
        // email already set up by yup for us
        email: yup.string().email("invalid email").required("required"),
        password: yup.string().required("required"),
        picture: yup.string().required("required"),
      });


      const initialValuesRegister = {
        firstName: "",
        lastName: "",
        institution: "",
        department: "",
        email: "",
        password: "",
        // picture: "",
      };




      const Form = () => {
        const {pageType, setPageType} = useState("login");
        // create your themes palette later on 
        // const {palatte} = useTheme();
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const loginPage = pageType == "login";
        const registerPage = pageType == "register";




        
      const register = async (values, onSubmitProps) => {
        // this allows us to send form info with image
        const formData = new FormData();
        for (let value in values) {
          formData.append(value, values[value]);
        }
        // formData.append("picturePath", values.picture.name);
    
        const savedUserResponse = await fetch(
          "http://localhost:3001/auth/register",
          {
            method: "POST",
            body: formData,
          }
        );
        
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();
    
        if (savedUser) {
          setPageType("login");
        }
      };


        const validateForm = async (values, onSubmitProps) =>{
            // if (loginPage) await login(values, onSubmitProps);
            if (registerPage) await register (values, onSubmitProps);
        };

        return(    
            <>
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
                    <form action="" onSubmit={handleSubmit} className="create-new-account">
                            <img src= {arrowLeft} alt="" className="go-back" />
                            <br />
                            <img src = {logo} alt="" className="logo" />
                            <h4 className="create-text">Create new account!</h4>
                            <div className="fname-to-dept">
                                <input type="text" className="firstname" placeholder="First name"
                                label="FirstName"
                                name="firstname"
                                value = {values.firstName}/>
                                <input type="text" className="lastname" placeholder="Last name"
                                label="LastName"
                                name="lastname"
                                value = {values.lastName}/>
                                <input type="text" className="institution" placeholder="Institution e.g UNIBEN"
                                label="Institution"
                                name="institution"
                                value = {values.institution}/>
                                <input type="text" className="department" placeholder="Department e.g CPE"
                                label="Department"
                                name="department"
                                value = {values.department}/>
                            </div>
                            
                            <div className="email-et-password">
                                <input type="email" className="email" placeholder="Email"
                                label="Email"
                                name="email"
                                value = {values.email}/>
                                <input type="password" className="password" placeholder="**********"
                                label="Password"
                                name="password"
                                value = {values.password}/>
                            </div>


                            <div className="warning-box">
                                    <img src={mustContain} alt="" className="password-warning"/>
                                </div>
    
                                <div className="check-password-content">
                                    <img src = {errorUppercase} alt="" className="uppercase"/>
                                    <img src = {errorLowercase} alt="" className="lowercase"/>
                                    <img src = {errorSymbol}  alt="" className="symbol"/>
                                    <img src = {errorNumber}  alt="" className="number"/>
                                </div>
                        
    
                                <div className="check-terms-and-conditions">
                                    <input type="checkbox" className="check-affirm" required/>
                                    <p className="read-terms">I have read and agreed to the <a href="#" className="terms-of-use">terms of use </a> 
                                    and <a href="#" className="privacy-policy">privacy policy.</a> </p>
                                </div>
    
                                <button className="create-account-button" type="submit">Create account</button>
    
                                <p className="redirect-to-login">Already have an account? <a href="./ChatsPage.js" className="redirect-login">Log in!</a> </p>
    
                            {/* for image dropping during profile creation
                            Copy to account settingspage */}

                            {/* <Dropzone
                            acceptedFiles = ".jpeg, .jpg, .png"
                            multiple = {false}
                            onDrop = {(acceptedFiles) => 
                                setFieldValue("picture", acceptedFiles[0] )
                            }
                            >
                                
                                    {({getRootProps, getInputProps}) =>(
                                        <div className="imageBox"
                                        {...getInputProps()} >
                                            <input {...getInputProps()}/>
                                            {values.picture ? ( <p> Upload picture</p> ): (
                                                <div className="profilePictureDiv"> {values.picture.name}</div>
                                            )}
                                             </div>
                                    
                                    )}
                            </Dropzone> */}    
                </form>     
                )}

            </Formik>
    
    
            
                 {/* <SearchHeader> </SearchHeader> */}
                
            </>
            
        )
    }


      }




    
    

export default FormCreateAcct;