import React, {useEffect, useState} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

// validation library
import * as Yup from "yup";
// form handling and validation
import { Formik, Form, Field, ErrorMessage } from 'formik';



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


// //misc imports
// // navigate when they register and login 
// import {useNavigate} from "react-router-dom";
// // use react redux to strore information
// import { useDispatch } from "react-redux";
// // set login when the user logs in 
// // recheck this code
// import {setLogin} from "state";
// //file upload
// import Dropzone from "react-dropzone";


  
  



const FormCreateAcct = () => {

        const initialValues = {
          first_name: '',
          last_name: '',
          institution: '',
          department: '',
          level: '',
          email: '',
          password: '',
        };

    const validationSchema = Yup.object({
        first_name: Yup.string().required('First name is required').max(25, 'Maximum 25 characters'),
        last_name: Yup.string().required('Last name is required').max(25, 'Maximum 25 characters'),
        institution: Yup.string().required('Institution is required').min(6, 'Minimum 6 characters').max(50, 'Maximum 50 characters'),
        department: Yup.string().required('Department is required').min(6, 'Minimum 6 characters').max(30, 'Maximum 30 characters'),
        level: Yup.string().required('Level is required').min(3, 'Minimum 2 characters').max(30, 'Maximum 30 characters'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().required('Password is required').max(25, 'Maximum 25 characters'),
      });


      const onSubmit = async (values, { setSubmitting, setStatus }) => {
        try {
          const response = await axios.post('http://localhost:5002/register', values);
          setStatus({ message: response.data.message });
        } catch (error) {
          setStatus({ message: error.response ? error.response.data.message : 'An error occurred' });;
        }
        setSubmitting(false);
      };



          return(    
            <>
             <Formik 

                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
//             onSubmit = {validateForm}
//             // initialValues = {loginPage ? initialValuesLogin : initialValuesRegister}
//             // AuthenticateShcema = {loginPage? loginSchema: registrationSchema}
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
                      isSubmitting,
                      status
                }) =>(
                    <Form onSubmit={handleSubmit} className="create-new-account">
                            <img src= {arrowLeft} alt="" className="go-back" />
                            <br />
                            <img src = {logo} alt="" className="logo" />
                            <h4 className="create-text">Create new account!</h4>

                            <div className="fname-to-dept">
                                <label>First Name:</label>
                                <Field type="text" 
                                className="firstname"
                                placeholder="First name"
                                // label="FirstName"
                                name="first_name"
                                required
                                />
                                <ErrorMessage name="first_name" component="div" />

                                <label>Last Name:</label>
                                <Field type="text" 
                                className="lastname" 
                                placeholder="Last name"
                                // label="LastName"
                                name="last_name"
                                required
                                />
                                <ErrorMessage name="last_name" component="div" />
 
                                <label>Institution:</label>
                                <Field type="text"
                                className="institution" 
                                placeholder="Institution e.g UNIBEN"
                                // label="Institution"
                                name="institution"
                                required
                                />
                                <ErrorMessage name="institution" component="div" />
 
                                <label>Department:</label>
                                <Field type="text"
                                className="department"
                                placeholder="Department e.g CPE"
                                // label="Department"
                                name="department"
                                required
                                />
                                <ErrorMessage name="department" component="div" />

 
                                <label>Level:</label>
                                <Field type="text"
                                className="department"
                                placeholder="Level e.g 400"
                                // label="Level"
                                name="level"
                                required
                                />
                                <ErrorMessage name="level" component="div" />

                            </div>
                            
                                
                            <div className="email-et-password">
                                <label>Email:</label>
                                <Field type="email" 
                                className="email" 
                                placeholder="Email"
                                // label="Email"
                                name="email"
                                required
                                />
                                <ErrorMessage name="email" component="div" />
 
                                <label>Password:</label>
                                 <Field type="password" 
                                 className="password" 
                                 placeholder="**********"
                                // label="Password"
                                name="password"
                                required
                                />
                                <ErrorMessage name="password" component="div" />
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
    
                                 <button 
                                    className="create-account-button" 
                                    type="submit"  disabled={isSubmitting} >Create account
                                 </button>
    
                                <p className="redirect-to-login">Already have an account?  
                                 <Link to = "/login"  className="custom-link">
                                     <a href="#" className="redirect-login">Log in!</a>
                                 </Link>
                                 </p>



                                 {status && status.message && (
  <>
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.8)', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000, 
      pointerEvents: 'none', 
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        color: 'rgba(0, 0, 0, 0.638)',
        fontSize: '4vw', 
        border: '1vw solid white', 
        padding: '2vw',
        borderRadius: '1vw',
        boxShadow: '0 0 1vw rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
        maxWidth: '90%',
        boxSizing: 'border-box',
        pointerEvents: 'auto', 
      }}>
        <div style={{ marginRight: '2vw' }}>
          {status.message}
        </div>
        <Link to = "/login" className="custom-link">
        <button style={{
          fontSize: '1vw',
          color: '#FD8D83',
          backgroundColor: 'white', 
          border: '1px solid #FD8D83',
          borderRadius: '2vw',
          margin: 0,
          padding: '1vw',
          borderRadius: '0.6vw',
          cursor: 'pointer', 
          outline: 'none',
          transition: 'background-color 0.3s', 
        }}
        onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#FD8D83';
            e.currentTarget.style.color = 'white';
        } 
    }
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}>
          HERE
        </button>
        </Link>
      </div>
    </div>
  </>
)}





                                 
                 </Form>     
                )}

            </Formik>
    
                 {/* <SearchHeader> </SearchHeader> */}
                
            </>
            
        )
     }
    
    
        export default FormCreateAcct;













//                             {/* for image dropping during profile creation
//                             Copy to account settingspage */}

//                             {/* <Dropzone
//                             acceptedFiles = ".jpeg, .jpg, .png"
//                             multiple = {false}
//                             onDrop = {(acceptedFiles) => 
//                                 setFieldValue("picture", acceptedFiles[0] )
//                             }
//                             >
                                
//                                     {({getRootProps, getInputProps}) =>(
//                                         <div className="imageBox"
//                                         {...getInputProps()} >
//                                             <input {...getInputProps()}/>
//                                             {values.picture ? ( <p> Upload picture</p> ): (
//                                                 <div className="profilePictureDiv"> {values.picture.name}</div>
//                                             )}
//                                              </div>
                                    
//                                     )}
//                             </Dropzone> */}  


//       const Form = () => {
//        // const {pageType, setPageType} = useState("login");
//         // create your themes palette later on 
//         // const {palatte} = useTheme();
//        // const dispatch = useDispatch();
//        // const navigate = useNavigate();
//         //const loginPage = pageType == "login";
//         //const registerPage = pageType == "register";


        
//       const register = async (values, onSubmitProps) => {
//         // this allows us to send form info with image
//         const formData = new FormData();
//         for (let value in values) {
//           formData.append(value, values[value]);
//         }
//         // formData.append("picturePath", values.picture.name);
    
//         const savedUserResponse = await fetch(
//           "http://localhost:3001/auth/register",
//           {
//             method: "POST",
//             body: formData,
//           }
//         );
        
//         const savedUser = await savedUserResponse.json();
//         onSubmitProps.resetForm();
    
//         if (savedUser) {
//           setPageType("login");
//         }
//       };


//         const validateForm = async (values, onSubmitProps) =>{
//             // if (loginPage) await login(values, onSubmitProps);
//             if (registerPage) await register (values, onSubmitProps);
//         };

//     }


      









