import React, {useState} from "react";
import { useEffect} from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";




//CUSTOM IMPORTS
// custom image imports
// import logo from "./logo images/logo light.svg"
import photoIcon from "../misc images/black and white/gallery.svg"
import bookIcon from "../misc images/black and white/book white.svg"
import saveCollections from "../misc images/black and white/collections dark.svg"
// import toggle from "./misc images/black and white/toggle-off-circle.svg"

// COMPONENTS
import BottomPanel from "../../components/BottomPanel";


// FILE IMPORTS
// import user from ".../"

// PICTURES
import  miniPicture from "../misc images/pictures/mini picture.jpg"
import  maxiPicture from "../misc images/pictures/maxi picture.jpg"
import  miniPicture2 from "../misc images/pictures/miniPicture2.jpg"
import  miniPicture3 from "../misc images/pictures/miniPicture3.jpg"
import  miniPicture4 from "../misc images/pictures/miniPicture4.jpg"
import  miniPicture5 from "../misc images/pictures/miniPicture5.jpg"



import collectionPic1 from "../misc images/pictures/forcollections1.jpg"
import collectionPic2 from "../misc images/pictures/forcollections2.jpg"
import collectionPic3 from "../misc images/pictures/forcollections3.jpg"
import collectionPic4 from "../misc images/pictures/forcollections4.jpg"
import collectionPic5 from "../misc images/pictures/forcollections2.jpg"
import collectionPic6 from "../misc images/pictures/forcollections4.jpg"





const Profilepage = () => {




    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token);
    // const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  
    const getUser = async () => {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
    };
  
    useEffect(() => {
      getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
    if (!user) return null;

    const Userfirstname = `${user.firstname}`;
    const Userlastname = `${user.lastname}`;
    const Userfullname = `${user.firstname} ${user.lastname}`;
    const Userdepartment = `${user.department}`;
    const Userlevel = `${user.Level}`;
    const userPicture = `${user.picturePath}`;




    return( 
        <>
             <body className="profile-body">
                <div className="profile-top">
                    <img src={<userPicture></userPicture>} className="homepage-profile-img"  alt="homepage-profile-img"/>
                </div>

                <div className="mini-profile-picture"> <img src={miniPicture} alt="" className="mini-profile-img" /> </div>

                <div className="profile-bottom">
                    <div className="profile-content">
                        <h3 className="profile-name"><Userfullname></Userfullname></h3>
                        <h6 className="profile-department"><Userdepartment></Userdepartment><p class="level"><Userlevel></Userlevel></p></h6> 
                    </div>
                    <div className="profile-status">
                        <p className="profile-status-word">Fullstack developer, blockchain developer,
                            <br/>
                            Forex and crypto trader, business and data analyst, 
                            <br/>
                            real estate investor.
                            Keep Pushing.
                        </p>
                    </div>
                    <div className="post-followers-following">
                        <p className="posts"> 50 <br/> Posts</p>
                        <p className="followers">89 <br/> Followers</p>
                        <p className="following">50  <br/>Following</p>
                    </div>
                    <div className="friends-box">
                        <h4 className="friends-tag"> Friends </h4>
                        <p className="see-all-friends"> <a href="#"> See all</a> </p>
                        <div className="friends-images">
                            <img src={miniPicture} alt="" className="first-friend" />
                            <img src={miniPicture2} alt="" className="second-friend" />
                            <img src={miniPicture3} alt="" className="third-friend" />
                            <img src={miniPicture4} alt="" className="fourth-friend" />
                            <img src={miniPicture5} alt="" className="more-friend" />
                        </div>
                    </div>
                    <div className="mini-profile-box">
                        <div className="top-profile-box">
                            <img src={photoIcon} alt="" className="image-box" />
                            <img src = {bookIcon} a lt="" className="books-box" />
                            <img src = {saveCollections} alt="" className="collection-box" />
                        </div>
                        <div class="bottom-profile-box">
                            <img src = {collectionPic1} alt="" className="first-image" />
                            <img src = {collectionPic2} alt="" className="second-image" />
                            <img src = {collectionPic3} alt="" className="third-image" />
                            <img src = {collectionPic4} alt="" className="fourth-image" />
                            <img src = {collectionPic5} alt="" className="fifth-image" />
                            <img src = {collectionPic6} alt="" className="sixth-image" />
                        </div>                
                    </div>
                </div>

              <BottomPanel></BottomPanel>
         </body>

        

        </>
 
    )
}


export default Profilepage;
