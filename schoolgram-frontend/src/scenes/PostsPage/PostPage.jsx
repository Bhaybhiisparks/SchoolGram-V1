import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BottomPanel from '../../components/BottomPanel';

import { AuthContext } from "../../context/authContext";


const PostPage = () => {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        // Fetch posts data from your API
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:5002/${user._id}/posts`);
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <>
         <div style={styles.container}>
            <h1 style={styles.heading}>My Posts</h1>
            {posts.length > 0 ? (
                <div>
                    <ul style={styles.postList}>
                    {posts.map((post) => (
                        <li key={post.id} style={styles.postItem}>
                            <h2 style={styles.postTitle}>{post.title}</h2>
                            <p style={styles.postContent}>{post.content}</p>
                        </li>
                    ))}
                    </ul>

                    <div style={styles.buttonContainer}>
                        <Link to={`/${user._id}/newpost`} className="custom-link" style={styles.buttonLeft}>
                            <button>Create more posts</button>
                        </Link>
                        <Link to={`/${user._id}`} className="custom-link" style={styles.buttonRight}>
                            <button>Go back</button>
                        </Link>
                    </div>
                </div>
            ) : ( <>
                    <p>No posts available. Create one now</p> 
                        <div> 
                        <Link to = {`/${user._id}/newpost`} className="custom-link">
                            <button>HERE</button>
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

export default PostPage;
