// import logo from './logo.svg';


// import STYLING
import "./mobileView655iPhone.css"
import "./Desktop1368.css"
import "./DesktopNew4000.css"


// FILES
import WelcomePage from './scenes/WelcomePage/WelcomePage';
import ChatsPage from './scenes/ChatsPage/ChatsPage';
import GroupsPage from "./scenes/GroupsPage/GroupsPage";

// import Profilepage from "./scenes/Homepage/Profilepage";
import AccountsPanel from './scenes/AccountsPanel/AccountsPanel';
import StatusPage from './scenes/StatusPage/StatusPage';
import PrivateChat from "./scenes/PrivateChat/PrivateChat";
// import WelcomeBackPage from './scenes/WelcomeBackPage/WelcomeBackPage';
// import FormCreateAcct from "./scenes/FormCreateAcct/FormCreateAcct";


// IMPORT COMPONENTS
import SearchHeaderChatGroup from './components/SearchHeaderChatGroup';



// toggle screen import
import React, { useEffect, useState } from 'react';
// import {ToggleScreen} from "./components/Togglescreen"


// PERSONALIZED IMPORTS
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
// import { BrowserRouter as Routes, Route, Switch } from 'react-router-dom';




function App() {

  // const isAuth = Boolean(useSelector((state) => state.token));


  // CSS STYLING
  const getDeviceType = () => {
    const width = window.innerWidth;
    if (width < 768) {
      return 'mobile';
    } else if (width >= 768 && width < 1024) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  };

  const [deviceType, setDeviceType] = useState(getDeviceType());

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType());
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    switch (deviceType) {
      case 'mobile':
        import('./mobileView655iPhone.css');
        break;
      case 'tablet':
        import('./Desktop1368.css');
        break;
      case 'desktop':
        import('./Desktop1368.css');
        break;
      default:
        break;
    }
  }, [deviceType]);



  // useEffect(() => {
  //   ToggleScreen(); // Call the function when the component mounts or as needed
  //   window.addEventListener('resize', ToggleScreen); // Add event listener for resize
  //   return () => {
  //     window.removeEventListener('resize', ToggleScreen); // Clean up event listener on unmount
  //   };
  // }, []);

    return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element ={<WelcomePage />} />
        {/* <Route path="/home" element ={<WelcomebackPage />} /> */}
        <Route path="/profile/userId" element ={<WelcomePage />} />
        <Route path="/chat" element ={<ChatsPage />} />
        <Route path="/group" element ={<GroupsPage />} /> 

        {/* <Route path="/profilepage" element ={<Profilepage />} />  */}
        <Route path="/accountspanel" element ={<AccountsPanel />} /> 
        <Route path="/statuspage" element ={<StatusPage />} /> 
        <Route path="/privatechat" element ={<PrivateChat />} /> 
      </Routes>
      </BrowserRouter>





    
    );
  }


export default App;
