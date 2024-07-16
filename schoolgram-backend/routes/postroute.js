import express from "express";
import { createPost, getUserPosts, updatePost, deletePost,  getAllPosts } from "../controllers/postcontroller.js"; 
import { likePost, commentOnPost, sharePost, bookmarkPost, repostPost } from "../controllers/postcontroller.js"; 
import { validatePostCreation } from "../middleware/validate.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new post
router.post('/:user/newpost', 
    auth.authenticateToken,
    validatePostCreation,
    createPost);

// Get all posts for homepage
router.get('/allposts', getAllPosts);

// Get all user posts
// userid-posts
router.get('/:user/posts', 
    // auth.authenticateToken,
    getUserPosts);


// Get specific user posts
// userid-postid-posts 
router.get('/:user/post/:id', 
    // auth.authenticateToken,
    getUserPosts);

// Update a post
router.patch('/:user/post/:id',
    // auth.authenticateToken, 
     validatePostCreation,
     updatePost);

// Delete a post
router.delete('/:user/post/:id',
    // auth.authenticateToken,
    validatePostCreation,
     deletePost);


///////////// POST ACTIONS ///////////////////
// Like a post
router.post('/:id/like', likePost);

// Comment on a post
router.post('/:id/comment', commentOnPost);

// Share a post
router.post('/:id/share', sharePost);

// Bookmark a post
router.post('/:id/bookmark', bookmarkPost);

// Repost a post
router.post('/:id/repost', repostPost);



export default router;
