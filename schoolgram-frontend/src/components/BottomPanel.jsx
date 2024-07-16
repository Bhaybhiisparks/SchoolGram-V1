import React, {useContext} from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/authContext";


//CUSTOM IMPORTS
// custom image imports
// import toggle from "./misc images/black and white/toggle-off.svg"
import homeIcon from "../scenes/misc images/black and white/home-2.svg"
import profile from "../scenes/misc images/black and white/profile 1.svg"
import statusIcon from "../scenes/misc images/black and white/status.svg"
import communitiesIcon from "../scenes/misc images/black and white/people.svg"
import chatIcon from "../scenes/misc images/coloured/messages.svg"






const BottomPanel = () => {
    const { user } = useContext(AuthContext);
    

    return( 
        <>
              <footer className="bottom-panel">
                    <div className="home-box">
                        <Link to = {`/post/allposts`} className="custom-link">
                            <img src = {homeIcon} alt="" className="home-img" />
                            <p className="home-name">Home</p>
                        </Link>
                        
                    </div>
                    <div className="profile-box">
                        <Link to = {`/${user._id}`} className="custom-link">
                            <img src = {profile} alt="" className="profile-tag" />
                            <p className="profile-name">Profile</p>
                        </Link>
                        
                    </div>
                    <div className="status-box">
                        <Link to = {`/${user._id}/status`} className="custom-link">
                            <img src = {statusIcon} alt="" className="status-img" />
                            <p className="profile-name">Status</p>
                        </Link>
                        
                    </div>
                    <div className="communities-box">
                        <Link to = "/communities" className="custom-link">
                            <img src = {communitiesIcon} alt="" className="communities-img" />
                            <p className="communities-name">Communities</p>
                        </Link>
                        
                    </div>
                    <div className="chat">
                        <Link to = {`/${user._id}/chat`} className="custom-link">
                            <img src = {chatIcon} alt="" className="chat-img" />
                            <p className="chat-name">Chat</p>
                        </Link>
                       
                    </div>
                </footer>
        </>
 
    )
}


export default BottomPanel;
