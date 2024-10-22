
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreatePostForm = () => {
    const [posts, setPosts] = useState([]);
    const [formData, setFormData] = useState({
        userId: '',
        first_name: '',
        last_name: '',
        institution: '',
        department: '',
        content: '',
        picturePath: '',
        userPicturePath: '',
    });

    const [editFormData, setEditFormData] = useState({
        id: '',
        title: '',
        content: '',
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`http://localhost:5002/${user._id}/newpost`);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEditChange = e => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5002/${user._id}/newpost`, formData);
            const newPost = response.data;
            setPosts([...posts, newPost]); // Update state to include the new post
            alert('Post created successfully!');
            setFormData({
                userId: '',
                first_name: '',
                last_name: '',
                institution: '',
                department: '',
                content: '',
                picturePath: '',
                userPicturePath: '',
            });
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Error creating post. Please try again.');
        }
    };

    const handleEditPost = async id => {
        try {
            // Find the post to edit by id
            const postToEdit = posts.find(post => post._id === id);
            if (!postToEdit) {
                console.error(`Post with id ${id} not found.`);
                return;
            }
            
            // Set the edit form data with the post to edit
            setEditFormData({
                id: postToEdit._id,
                title: postToEdit.title,
                content: postToEdit.content,
            });
        } catch (error) {
            console.error('Error editing post:', error);
            alert('Error editing post. Please try again.');
        }
    };

    const handleSubmitEdit = async e => {
        e.preventDefault();
        try {
            const { id, title, content } = editFormData;
            await axios.patch(`http://localhost:5002/${user._id}/newpost/${id}`, { title, content });
            fetchPosts(); // Refresh posts after edit
            alert('Post updated successfully!');
            setEditFormData({ id: '', title: '', content: '' });
        } catch (error) {
            console.error('Error updating post:', error);
            alert('Error updating post. Please try again.');
        }
    };

    const handleDeletePost = async id => {
        try {
            await axios.delete(`http://localhost:5002/${user._id}/newpost/${id}`);
            // Update state to remove the deleted post
            setPosts(posts.filter(post => post._id !== id)); 
            alert('Post deleted successfully!');
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Error deleting post. Please try again.');
        }
    };

    return (
        <div>
            <h1>My Posts</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required />
                <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required />
                <input type="text" name="institution" placeholder="Institution" value={formData.institution} onChange={handleChange} required />
                <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
                <textarea name="content" placeholder="Content" value={formData.content} onChange={handleChange} required />
                <input type="text" name="picturePath" placeholder="Picture Path" value={formData.picturePath} onChange={handleChange} />
                <input type="text" name="userPicturePath" placeholder="User Picture Path" value={formData.userPicturePath} onChange={handleChange} />
                <button type="submit">Create Post</button>
            </form>

            {posts.length > 0 ? (
                <ul>
                    {posts.map(post => (
                        <li key={post._id}>
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                            <button onClick={() => handleEditPost(post._id)}>Edit</button>
                            <button onClick={() => handleDeletePost(post._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No posts available.</p>
            )}

            {editFormData.id && (
                <div>
                    <h2>Edit Post</h2>
                    <form onSubmit={handleSubmitEdit}>
                        <input type="text" name="title" placeholder="Title" value={editFormData.title} onChange={handleEditChange} required />
                        <textarea name="content" placeholder="Content" value={editFormData.content} onChange={handleEditChange} required />
                        <button type="submit">Save Changes</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CreatePostForm;
