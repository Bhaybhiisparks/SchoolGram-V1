// import logo from './logo.svg';


// import STYLING
import "./mobileView655iPhone.css"
import "./Desktop1368.css"
import "./Desktop4000.css"


// FILES
import WelcomePage from './scenes/WelcomePage/WelcomePage';
import ChatsPage from './scenes/ChatsPage/ChatsPage';
import GroupsPage from "./scenes/GroupsPage/GroupsPage";
import PostPage from './scenes/PostsPage/PostPage';
import NewPost from './scenes/PostsPage/NewPost';

import ProfilePage from "./scenes/Homepage/ProfilePage";
import HomePage from "./scenes/Homepage/HomePage";
import AccountsPanel from './scenes/AccountsPanel/AccountsPanel';
import StatusPage from './scenes/StatusPage/StatusPage';
import PrivateChat from "./scenes/PrivateChat/PrivateChat";
import WelcomeBackPage from './scenes/WelcomeBackPage/WelcomeBackPage';
import FormCreateAcct from "./scenes/FormCreateAcct/FormCreateAcct";


// IMPORT COMPONENTS
import SearchHeaderChatGroup from './components/SearchHeaderChatGroup';




import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Switch, Navigate } from "react-router-dom";

import { UserProvider } from "./context/userContext";



function App() {

  // TOGGLE SCREEN
  const getDeviceType = () => {
    const width = window.innerWidth;
    if (width < 768) {
      return 'mobile';
    } else if (width >= 768 && width < 1024) {
      return 'tablet';
    } else if (width >= 1024 && width <1368) {
      return 'desktop'
    }
    else {
      return 'largedesktop';
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
      case 'largedesktop':
        import('./Desktop4000.css');
        break;
      default:
        break;
    }
  }, [deviceType]);




    return (
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element ={<WelcomePage />} />
        <Route path="/register" element ={<FormCreateAcct />} />
        <Route path="/login" element ={<WelcomeBackPage />} />


        <Route path = "/post/allposts" element = {<HomePage />} />
        <Route path="/:id" element ={<ProfilePage />} /> 
        <Route path="/:user/posts" element ={<PostPage />} /> 
        <Route path="/:user/newpost" element ={<NewPost />} /> 
        <Route path="/:user/accountspanel" element ={<AccountsPanel />} /> 
          {/* <Route element= {<UserProvider />}> */}
          <Route path="/:user/status" element ={<StatusPage />} />
          {/* </Route> */}
        <Route path="/chat" element ={<ChatsPage />} />
        <Route path="/group" element ={<GroupsPage />} />   
        <Route path="/privatechat" element ={<PrivateChat />} /> 
      </Routes>
      </BrowserRouter>
    
    );
  }


export default App;
























