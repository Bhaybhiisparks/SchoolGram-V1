import { useEffect, useState, useContext} from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from 'react-router-dom';




//CUSTOM IMPORTS
// custom image imports
// import logo from "./logo images/logo light.svg"
import photoIcon from "../misc images/black and white/gallery.svg"
import bookIcon from "../misc images/black and white/book white.svg"
import saveCollections from "../misc images/black and white/collections dark.svg"
// import toggle from "./misc images/black and white/toggle-off-circle.svg"

// COMPONENTS
import BottomPanel from "../../components/BottomPanel";



// PICTURES
import  miniPicture from "../misc images/pictures/mini picture.jpg"
import  maxiPicture from "../misc images/pictures/maxi picture.jpg"
import  miniPicture2 from "../misc images/pictures/miniPicture2.jpg"
import  miniPicture3 from "../misc images/pictures/miniPicture3.jpg"
import  miniPicture4 from "../misc images/pictures/miniPicture4.jpg"
import  miniPicture5 from "../misc images/pictures/miniPicture5.jpg"

import profileMenu from "../misc images/black and white/icons8-menu-vertical-white.png"



import collectionPic1 from "../misc images/pictures/forcollections1.jpg"
import collectionPic2 from "../misc images/pictures/forcollections2.jpg"
import collectionPic3 from "../misc images/pictures/forcollections3.jpg"
import collectionPic4 from "../misc images/pictures/forcollections4.jpg"
import collectionPic5 from "../misc images/pictures/forcollections2.jpg"
import collectionPic6 from "../misc images/pictures/forcollections4.jpg"





const ProfilePage = () => {


    const { user, loading } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
          navigate('/login'); 
        }
      }, [loading, user, navigate]);
   

    useEffect(() => {
        // if (user) {
            const fetchProfileData = async () => {
                setError(null);
                try {
                    const response = await axios.get(`http://localhost:5002/${user._id}`, {
                        withCredentials: true,
                    });
                    console.log('Profile data:', response.data);
                    setProfile(response.data.data);
                } catch (error) {
                    setError("Error fetching profile data");
                    console.error("Error fetching profile data:", error);
                }  
            };

            if (user){
                fetchProfileData();
            } else {
            setError("User not authenticated");
        }
    }, [user]);

    if (loading) {
        return <p>Loading...</p>;
      }
      if (error) {
        return <p>{error}</p>;
      }
    if (!profile) {
        return <p>Checking for profile data</p>;
    }

    return( 
        <>
             <body className="profile-body">
                <div className="profile-top">
                <img src={maxiPicture} className="homepage-profile-img"  alt="homepage-profile-img"/>
                      <Link to = {`/${user._id}/accountspanel`} className="custom-link">
                         <img src={profileMenu} className="homepage-profile-vertical-menu"  alt="menu vertical icon by icon 8"/>
                      </Link> 
                </div>

                <div className="mini-profile-picture">
                    <Link to = "/user/:id/" className="custom-link">
                        <img src={miniPicture} alt="" className="mini-profile-img" />
                    </Link>
                 </div>

                <div className="profile-bottom">
                    <div className="profile-content">
                        <h3 className="profile-name">{profile.first_name} {user.last_name}</h3>
                        <h6 className="profile-department"> Level: {profile.level}<p class="level"></p></h6> 
                    </div>
                    <div className="profile-status">
                        <p className="profile-status-word"> Department: {profile.department}</p>
                    </div>
                    <div className="post-followers-following">
                        <Link to = {`/${user._id}/posts`} className="custom-link">
                            <p className="posts"> {profile.posts} <br/> Posts</p>
                        </Link>
                        <Link to = "/user/:id" className="custom-link">
                            <p className="followers">{profile.followers} <br/> Followers</p>
                        </Link>
                        <Link to = "/user/:id" className="custom-link">
                            <p className="following">{profile.following} <br/> Following </p>
                        </Link>
                                  
                    </div>
                    <div className="friends-box">
                        <h4 className="friends-tag"> {profile.friends.length} <br/> Friends </h4>
                        <Link to = "/user/:id" className="custom-link">
                            <p className="see-all-friends"> <a href="#"> See all</a> </p>
                        </Link>
                        
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
                        <div className="bottom-profile-box">
                            <img src = {collectionPic1} alt="" className="first-image" />
                            <img src = {collectionPic2} alt="" className="second-image" />
                            <img src = {collectionPic3} alt="" className="third-image" />
                            <img src = {collectionPic4} alt="" className="fourth-image" />
                            <img src = {collectionPic5} alt="" className="fifth-image" />
                            <img src = {collectionPic6} alt="" className="sixth-image" />
                        </div>                
                    </div>
                </div>

              <BottomPanel />
         </body>

        

        </>
 
    )
}


export default ProfilePage;






