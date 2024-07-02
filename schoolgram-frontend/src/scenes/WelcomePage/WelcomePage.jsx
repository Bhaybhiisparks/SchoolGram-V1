import React from "react";





//CUSTOM IMPORTS
// custom image imports
// import toggle from "./misc images/toggle-off.svg"
import welcomeLogo from "../../logo images/schoolgramwelcomelogo.svg"





const WelcomePage = () => {
    return( 
        <>
        <body>
                <div className="welcomePage-div">
                <img src ={welcomeLogo} className="welcome-logo" alt="welcome-logo"/>
                     <div className="welcomePage-buttons">
                         <button className="login-button">Login</button>
                         <button className="create-new-account">Create new account</button>
                    </div>
                </div>
               
             </body>
        
        </>
 
    )
}


export default WelcomePage;
