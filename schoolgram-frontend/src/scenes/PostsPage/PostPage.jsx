import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch posts data from your API
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5002/posts'); // Adjust URL to your API endpoint
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>My Posts</h1>
            {posts.length > 0 ? (
                <ul style={styles.postList}>
                    {posts.map((post) => (
                        <li key={post.id} style={styles.postItem}>
                            <h2 style={styles.postTitle}>{post.title}</h2>
                            <p style={styles.postContent}>{post.content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No posts available.</p>
            )}
        </div>
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
    },
    postContent: {
        margin: '0',
    },
};

export default PostPage;
