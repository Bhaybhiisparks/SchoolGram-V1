import React, {useEffect, useState, useContext} from "react";
import { AuthContext } from "../../context/authContext";



//CUSTOM IMPORTS


import SearchHeader from "../../components/SearchHeader";
import BottomPanel from "../../components/BottomPanel";


// custom image imports
import arrowDown from "../misc images/black and white/arrow-down.svg"
import goBack from "../misc images/black and white/arrow-left.svg"
import toggle from "../misc images/coloured/toggle (1).svg"
import logoutIcon from "../misc images/black and white/icons8-logout-48.png"
import deleteAccount from "../misc images/black and white/profile 1.svg"






const AccountsPanel = ({userId}) => {

    const [settings, setSettings] = useState(null);
    const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`/${user._id}/accountspanel`);
        const data = await response.json();
        setSettings(data);
      } catch (error) {
        console.error('Error fetching settings page:', error);
      }
    };

    fetchSettings();
  }, [userId]);


    return( 
        // <>
            <div className="chat-body">
               <SearchHeader clasName="search-header"> </SearchHeader>


               <div className="account-main">
                <div className="account-main-top">

                <div className="A-dropdown">
                    <label for="account" className="dropdown-label">Account</label>
                    <img src = {arrowDown} alt="" className="dropdown-img" />
                    <ul name="" id="" className="account">
                        <option value="">My Profile</option>
                        <option value="">Change password</option>
                        <option value="">School & Course</option>
                    </ul>
                </div>
    
                <div className="B-dropdown">
                    <label for="privacy-N-security" className="dropdown-label">Privacy and Security</label>
                    <img src = {arrowDown} alt="" className="dropdown-img" />
                    <ul name="" id="" clasName="privacy-N-security">
                        <option value="">Edit profile</option>
                        <option value="">Account</option>
                        <option value="">Password settings</option>
                    </ul>
                </div>
    
                <div className="C-dropdown">
                    <label for="customize-chat" className="dropdown-label">Customize Chat</label>
                    <img src = {arrowDown} alt="" className="dropdown-img" />
                    <ul name="" id="" className="customize-chat">
                        <option value="">Edit profile</option>
                        <option value="">Account</option>
                        <option value="">Password settings</option>
                    </ul>
                </div>
    
                <div className="D-dropdown">
                    <label for="account" className="dropdown-label">Notofication</label>
                    <img src = {arrowDown} alt="" className="dropdown-img" />
                    <ul name="" id="" className="Notification">
                        <option value="">Manage notifications</option>
                    </ul>
                </div>
    
                <div className="E-dropdown">
                    <label for="help" className="dropdown-label help">Help</label>
                    <img src = {arrowDown} alt="" className="dropdown-img" />
                <ul name="" id="" className="help" disabled>
                    <option value="">About</option>
                    <option>Contact Us</option>
                    <option>FAQs</option>
                </ul>
                </div>
                
            </div>
           

            <div className="account-main-bottom">
                <div className="F-dropdown">
                    <img src = {logoutIcon} className="logNdelete-img"/>
                   <label for="account" className="dropdown-label">Logout</label>
                      <img src = {arrowDown} alt="" className="dropdown-img" />
                        <ul name="" id="" className="Notification">
                          <option value=""></option>
                         </ul>
                </div>

                <div className="G-dropdown">
                    <img src = {deleteAccount} className="logNdelete-img"/>
                   <label for="account" className="dropdown-label delete-account">Delete Account</label>
                     <img src = {arrowDown} alt="" className="dropdown-img" />
                        <ul name="" id="" className="Notification">
                            <option value=""></option>
                        </ul>
                </div>
               
              
                
            </div>
        </div>

        <div className="account-bottom">
            <BottomPanel></BottomPanel>
        </div>
            </div>

        // </>
       )
}


export default AccountsPanel;
