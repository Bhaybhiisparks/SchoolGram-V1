import express from "express";
import { createPost, getUserPosts, updatePost, deletePost,  getAllPosts } from "../controllers/postcontroller.js"; // 
import { validatePostCreation } from "../middleware/validate.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new post
router.post('/post', 
    // auth.authenticateTokencreatePost,
    validatePostCreation,
    createPost);

// Get all user posts
router.get('/:userId/posts', 
    // auth.authenticateToken,
    getUserPosts);

// Update a post
router.patch('/post/:id',
    // auth.authenticateToken, 
     validatePostCreation,
     updatePost);

// Delete a post
router.delete('/:userId/post/:id',
    // auth.authenticateToken,
    validatePostCreation,
     deletePost);



// Get all posts for homepage
router.get('/allposts', getAllPosts);

export default router;
