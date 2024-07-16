import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import ProfilePage from "../Homepage/ProfilePage";
import { Link } from "react-router-dom";






//CUSTOM IMPORTS
// custom image imports
// import toggle from "./misc images/black and white/toggle-off.svg"
import  miniPicture from "../misc images/pictures/mini picture.jpg"
import exitIcon from "../misc images/black and white/exit-circle.svg"
import voiceRecord from "../misc images/black and white/microphone-2.svg"
import photoIcon from "../misc images/black and white/gallery.svg"
import moreIcon from "../misc images/black and white/more.svg"
import cameraIcon from "../misc images/black and white/home.svg"






const StatusPage = ({userId}) => {

        const { user } = useContext(AuthContext);
        const { status, setStatus } = useState('');
        const [content, setContent] = useState('');
        const [visibility, setVisibility] = useState('Public');
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        // const [media, setMedia] = useState([]);
        // const [message, setMessage] = useState('');
        // const [statusId, setStatusId] = useState(null);
    
        useEffect(() => {
            const fetchStatus = async () => {         
                    
                    try {
                      console.log("Fetching status for user ID:", userId);
                      const response = await axios.get(`http://localhost:5002/${user._id}/status`);
                      console.log("response data ", response.data)

                      if (response.data && response.data.content) {
                        setContent(response.data.content);
                        setStatus(response.data.content);
                      } else {
                        setContent('');
                        setStatus('');
                      }
                    } catch (error) {
                      console.error("Error fetching status:", error);
                     // Set status and content to empty if not found
                        setContent('');
                        setStatus('');
                      alert('First Time Status Update Ehh??');
                    } finally {
                        setLoading(false);
                      }
                  };

                  if (userId) {
                    fetchStatus();
                    } else {
                    console.error("User ID is not provided");
                    setLoading(false);
                  }
                }, [userId]);
            

                const handleStatusChange = (e) => {
                    setContent(e.target.value);
                  };
                
                  const handlePostStatus = async () => {
                    try {
                      const response = await axios.post(`http://localhost:5002/${user._id}/poststatus`, { content });
                      setStatus(response.data.content);
                      setContent('');
                      alert('Status posted successfully');
                    } catch (error) {
                      console.error("Error posting status:", error);
                      alert('Failed to post status');
                    }
                  };

                  const handleVisibilityChange = (e) => {
                    setVisibility(e.target.value);
                  };
                
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p>Error: {error.message}</p>;

            return( 
                <>
                    <body>
                        <>
                            <div className="status-page-background">
                                <ProfilePage />
                            </div>
                            <div className="status-page-body">

                    <div className="status-page-top">
                        <img src = {miniPicture} className="status-profile-img" />
                        <h6 className="status-profile-name">{user?.firstName} {user?.lastName}</h6>
                        <p className="status-privacy">
                            <select className="status-privacy" value={visibility} onChange={handleVisibilityChange}>
                                <option value="Public">Public</option>
                                <option value="Private">Private</option>
                            </select>
                        </p>
                        <Link to = {`/${user._id}`} className="custom-link">
                            <img src = {exitIcon} className="status-exit-img" />    
                        </Link>
                    </div>
                    <textarea 
                        className="status-input" 
                            placeholder="What happened today?"
                            value={content}
                            onChange={handleStatusChange}
                            ></textarea>
                

                            <footer className="status-page-footer">
                            <img src = {voiceRecord} className="status-record-status" alt="Voice Record" />
                            <img src = {cameraIcon} className="status-status-camera" alt="Camera" />
                            <img src = {photoIcon} className="status-upload-media" alt="Upload Media" />
                            <img src = {photoIcon} className="status-upload-media" alt="More Options"/>
                            <a href="#" className="status-more-options" ><img src = {moreIcon} className="status-upload-media" /></a>
                            <button className="post-status" onClick={handlePostStatus}>Post</button>
                            </footer>


                                    <div className="recent-status">
                                    <h4>Recent Status:</h4>
                                    <p>{status}</p>
                                    </div>
                            
                            </div> 
                        </>
                    </body>
                </>
                
            );
    };



export default StatusPage;
