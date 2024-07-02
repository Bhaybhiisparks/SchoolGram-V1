// import logo from './logo.svg';
// import './App.css';

// CSS
// import "./mobileView.css";
// import "./DesktopNew.css"


// FILES
// import FormLogin from './scenes/FormCreateAcct/FormLogin';
import AccountsPanel from './scenes/AccountsPanel/AccountsPanel';
import ChatsPage from './scenes/ChatsPage/ChatsPage';
import GroupsPage from "./scenes/GroupsPage/GroupsPage";
import HomePage from './scenes/Homepage/Profilepage';
import WelcomePage from './scenes/WelcomePage/WelcomePage';
import StatusPage from './scenes/StatusPage/StatusPage';
import PrivateChat from "./scenes/PrivateChat/PrivateChat";
import WelcomeBackPage from './scenes/WelcomeBackPage/WelcomeBackPage';
import FormCreateAcct from "./scenes/FormCreateAcct/FormCreateAcct";
import Profilepage from "./scenes/Homepage/Profilepage";

// IMPORT COMPONENTS
import SearchHeaderChatGroup from './components/SearchHeaderChatGroup';

// App.js


// toggle screen import
import React, { useEffect } from 'react';
import {ToggleScreen} from "./components/Togglescreen"


// PERSONALIZED IMPORTS
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";



function App() {

  // const isAuth = Boolean(useSelector((state) => state.token));


  useEffect(() => {
    ToggleScreen(); // Call the function when the component mounts or as needed
    window.addEventListener('resize', ToggleScreen); // Add event listener for resize
    return () => {
      window.removeEventListener('resize', ToggleScreen); // Clean up event listener on unmount
    };
  }, []);

    return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element ={<WelcomePage />} />
        <Route path="/home" element ={<HomePage />} />
        <Route path="/profile/userId" element ={<WelcomePage />} />
        <Route path="/chat" element ={<ChatsPage />} />
        <Route path="/group" element ={<GroupsPage />} /> 
      </Routes>
      </BrowserRouter>




    // <FormLogin> </FormLogin>
    // <ChatsPage> </ChatsPage>
    // <GroupsPage></GroupsPage>
    // <AccountsPanel></AccountsPanel>
    // <SearchHeaderChatGroup></SearchHeaderChatGroup>
    // <HomePage></HomePage>
    // <WelcomePage></WelcomePage>
    // <StatusPage></StatusPage>
    // <PrivateChat></PrivateChat>
    // <WelcomeBackPage></WelcomeBackPage>
    // <FormCreateAcct></FormCreateAcct>
    
    );
  }


export default App;
