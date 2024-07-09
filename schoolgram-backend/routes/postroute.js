// import express from "express";
// import Post from "../models/Post";
// import { check } from "express-validator";

// const router = express.Router();

// // Create a new post
// router.post('/posts', async (req, res) => {
//     try {
//         const { userId, first_name, last_name, institution, department, content, picturePath, userPicturePath } = req.body;
        
//         const newPost = new Post({
//             userId,
//             first_name,
//             last_name,
//             institution,
//             department,
//             content,
//             picturePath,
//             userPicturePath,
//             likes: new Map(),
//             comments: []
//         });

//         const savedPost = await newPost.save();
//         res.status(201).json(savedPost);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// // Get all posts
// router.get('/posts', async (req, res) => {
//     try {
//         const posts = await Post.find();
//         res.json(posts);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Update a post
// router.patch('/posts/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
//         res.json(updatedPost);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// // Delete a post
// router.delete('/posts/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletedPost = await Post.findByIdAndDelete(id);
//         res.json(deletedPost);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// export default router;
