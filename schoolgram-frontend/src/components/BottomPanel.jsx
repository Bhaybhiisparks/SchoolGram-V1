import React from "react";



//CUSTOM IMPORTS
// custom image imports
// import toggle from "./misc images/black and white/toggle-off.svg"
import homeIcon from "../scenes/misc images/black and white/home-2.svg"
import profile from "../scenes/misc images/black and white/profile 1.svg"
import statusIcon from "../scenes/misc images/black and white/status.svg"
import communitiesIcon from "../scenes/misc images/black and white/people.svg"
import chatIcon from "../scenes/misc images/coloured/messages.svg"






const BottomPanel = () => {
    return( 
        <>
              <footer className="bottom-panel">
                    <div className="home-box">
                        <img src = {homeIcon} alt="" className="home-img" />
                        <p className="home-name">Home</p>
                    </div>
                    <div className="profile-box">
                        <img src = {profile} alt="" className="profile-tag" />
                        <p className="profile-name">Profile</p>
                    </div>
                    <div className="status-box">
                        <img src = {statusIcon} alt="" className="status-img" />
                        <p className="profile-name">Status</p>
                    </div>
                    <div className="communities-box">
                        <img src = {communitiesIcon} alt="" className="communities-img" />
                        <p className="communities-name">Communities</p>
                    </div>
                    <div className="chat-box">
                        <img src = {chatIcon} alt="" className="chat-img" />
                        <p className="chat-name">Chat</p>
                    </div>
                </footer>
        </>
 
    )
}


export default BottomPanel;
