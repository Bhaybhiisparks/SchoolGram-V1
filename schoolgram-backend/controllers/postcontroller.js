import Post from '../models/Post.js'; 

// Create a new post
export async function createPost  (req, res) {
    try {
        const { userId, first_name, last_name, institution, department, content, picturePath, userPicturePath } = req.body;
        
        const newPost = new Post({
            userId,
            first_name,
            last_name,
            institution,
            department,
            content,
            picturePath,
            userPicturePath,
            likes: new Map(),
            comments: [],
            shares: [],
            bookmarks: [],
            reposts: [],
            views: 0
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Get all user posts 
export async function getUserPosts (req, res) {
    try {
        const { userId } = req.params; // Get userId from URL params
        const posts = await Post.find({ userId }); // Find posts with matching userId
        if (posts.length === 0) {
            // conole log post id for debugging later on 
            return res.status(404).json({ message: "No posts found for this user." });
        }
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a post
export async function updatePost (req, res) {
    try {
        const { id } = req.params;
        const { userId } = req.body; 

        // Find the post by its id
        const post = await Post.findById(id);
        
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        // Check if the userId matches the post's userId
        if (post.userId.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized to update this post." });
        }

        // Update the post
        const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a post
export async function deletePost (req, res) {
    try {
        const { id } = req.params;
        const { userId } = req.body; 

        // Find the post by its id
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        // Check if the userId matches the post's userId
        if (post.userId.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized to delete this post." });
        }

        // Delete the post
        const deletedPost = await Post.findByIdAndDelete(id);
        res.json(deletedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Get all posts for homepage
export async function getAllPosts (req, res) {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
