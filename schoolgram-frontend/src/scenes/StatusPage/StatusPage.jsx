import React from "react";
import ProfilePage from "../Homepage/ProfilePage";





//CUSTOM IMPORTS
// custom image imports
// import toggle from "./misc images/black and white/toggle-off.svg"
import  miniPicture from "../misc images/pictures/mini picture.jpg"
import exitIcon from "../misc images/black and white/exit-circle.svg"
import voiceRecord from "../misc images/black and white/microphone-2.svg"
import photoIcon from "../misc images/black and white/gallery.svg"
import moreIcon from "../misc images/black and white/more.svg"
import cameraIcon from "../misc images/black and white/home.svg"






const StatusPage = () => {
    return( 
        <>
             <body>
                <>
                    <div className="status-page-background">
                        <ProfilePage></ProfilePage>
                    </div>
                    <div className="status-page-body">
            <div className="status-page-top">
                 <img src = {miniPicture} className="status-profile-img" />
                 <h6 className="status-profile-name">Osagioduwa Faith</h6>
                 <p className="status-privacy">Public</p>
                 <img src = {exitIcon} className="status-exit-img" />
            </div>
            <textarea className="status-input" placeholder="What happened today?"></textarea>
         

                        <footer className="status-page-footer">
                    <img src = {voiceRecord} className="status-record-status" />
                    <img src = {cameraIcon} className="status-status-camera" />
                    <img src = {photoIcon} className="status-upload-media" />
                    <a href="#" className="status-more-options" ><img src = {moreIcon} className="status-upload-media" /></a>
                    <button className="post-status">Post</button>

                    </footer>

                    </div>
                    
                </>


             </body>
        </>
 
    )
}


export default StatusPage;
