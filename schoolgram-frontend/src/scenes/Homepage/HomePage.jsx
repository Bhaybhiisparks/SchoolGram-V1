import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BottomPanel from '../../components/BottomPanel';
import SearchHeader from '../../components/SearchHeader'

import { AuthContext } from "../../context/authContext";

import likeIcon from "../misc images/coloured/like.svg"
import shareIcon from "../misc images/coloured/share.svg"
import commentIcon from "../misc images/black and white/comment.svg"
import bookmarkIcon from "../misc images/coloured/gallery coloured.svg"
import respostIcon from "../misc images/black and white/repost.svg"


const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                // console.log("Fetched posts data1:", response.data.post);
                const response = await axios.get(`http://localhost:5002/post/allposts`);
                console.log("Fetched posts data2:", response.data);
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchAllPosts();
    }, []);

    const handleLike = async (postId) => {
        try {
            const response = await axios.post(`http://localhost:5002/posts/${postId}/like`, { userId: user._id });
            setPosts(posts.map(post => post._id === postId ? response.data : post));
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const handleComment = async (postId) => {
        const content = prompt('Enter your comment:');
        if (content) {
            try {
                const response = await axios.post(`http://localhost:5002/posts/${postId}/comment`, { userId: user._id, content });
                setPosts(posts.map(post => post._id === postId ? response.data : post));
            } catch (error) {
                console.error('Error commenting on post:', error);
            }
        }
    };

    const handleShare = async (postId) => {
        try {
            const response = await axios.post(`http://localhost:5002/posts/${postId}/share`, { userId: user._id });
            setPosts(posts.map(post => post._id === postId ? response.data : post));
        } catch (error) {
            console.error('Error sharing post:', error);
        }
    };

    const handleBookmark = async (postId) => {
        try {
            const response = await axios.post(`http://localhost:5002/posts/${postId}/bookmark`, { userId: user._id });
            setPosts(posts.map(post => post._id === postId ? response.data : post));
        } catch (error) {
            console.error('Error bookmarking post:', error);
        }
    };

    const handleRepost = async (postId) => {
        try {
            const response = await axios.post(`http://localhost:5002/posts/${postId}/repost`, { userId: user._id });
            setPosts(posts.map(post => post._id === postId ? response.data : post));
        } catch (error) {
            console.error('Error reposting post:', error);
        }
    };


    return (
        <>
        <SearchHeader />
         <div className="hompagecontainer">
            <h1 className ="homepageheading"> Recommendations </h1>
            {posts ? (
                <div>
                     <ul className="hompagepostList">
                        {posts.map((post) => (
                            <li key={post.id} className="homepagepostItem">
                                <div className="homepageprofile-header">
                                    <img src={post.userPicturePath} alt="Profile" />
                                    <div className="homepageuser-info">
                                        <h1>{post.first_name} {post.last_name}</h1>
                                        <p>{post.institution} • {post.department}</p>
                                    </div>
                                </div>
                                <p className="homepagepost-content">{post.content}</p>
                                {post.picturePath && <img src={post.picturePath} alt="Post" className="homepagepost-image" />}
                                <div className="homepagepost-actions">
                                    <button onClick={() => handleLike(post.id)}>
                                        <img src={likeIcon} alt="Like" />
                                    </button>
                                    <button onClick={() => handleComment(post.id)}>
                                        <img src={commentIcon} alt="Comment" />
                                    </button>
                                    <button onClick={() => handleShare(post.id)}>
                                        <img src={shareIcon} alt="Share" />
                                    </button>
                                     <button onClick={() => handleRepost(post.id)}>
                                        <img src={respostIcon} alt="repost" />
                                    </button>
                                    <button onClick={() => handleBookmark(post.id)}>
                                        <img src={bookmarkIcon} alt="Bookmark" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : ( 
            <>
                    <p>No posts available yet on schoolgram. Be the first to create one now.</p> 
                        <div className="homepagebuttonContainer"> 
                        <Link to = {`/${user._id}/newpost`} className="custom-link"> 
                            <button className="homepagebuttonLeft">CLICK HERE TO CREATE A POST</button>
                        </Link>
                        </div>
                  </>
             )} 

            <BottomPanel />
        </div>
        </>
       
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    postList: {
        listStyleType: 'none',
        padding: '0',
    },
    postItem: {
        borderBottom: '1px solid #ccc',
        padding: '10px 0',
    },
    postTitle: {
        margin: '0 0 10px',
        fontSize: '18px',
        fontWeight: 'bold',
    },
    postContent: {
        margin: '0',
        fontSize: '16px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    buttonLeft: {
        marginRight: 'auto',
    },
    buttonRight: {
        marginLeft: 'auto',
    }
};

export default HomePage;
