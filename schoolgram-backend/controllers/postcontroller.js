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
        console.log('Post created:', savedPost); // Debugging
        res.status(201).json(savedPost);
    } catch (error) {
        console.error('Error creating post:', error.message);
        res.status(400).json({ message: error.message });
    }
};


// Get all posts for homepage
export async function getAllPosts (req, res) {
    try {
        const posts = await Post.find().populate( 'first_name last_name'); 
        console.log("Fetched posts at getAllPost function are: ", posts);
        res.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};


// Get all user posts 
export async function getUserPosts (req, res) {
    try {
        const { user } = req.params; 
        console.log('Fetching posts for user ID:', user); // Debugging line

        if (!user) {
            return res.status(400).json({ message: "User ID is required." });
        }

        const posts = await Post.find({ userId: user }); // Find posts with matching userId
        console.log('Posts found:', posts);

        if (posts.length === 0) {
            console.log('No posts found for user ID:', user); 
            return res.status(404).json({ message: "No posts found for this user." });
        }
        res.json(posts);
    } catch (error) {
        console.error('Error in getUserPosts:', error.message); 
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


///////////////////////////// POST ACTIONS ///////////////////////////

// Like a post
export async function likePost(req, res) {
    try {
        const postId = req.params.id;
        const { userId } = req.body;
        const post = await Post.findById(postId);

        if (post.likes.has(userId)) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        await post.save();
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
}

// Comment on a post
export async function commentOnPost(req, res) {
    try {
        const postId = req.params.id;
        const { userId, content } = req.body;
        const post = await Post.findById(postId);

        post.comments.push({ user_id: userId, content });

        await post.save();
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
}

// Share a post
export async function sharePost(req, res) {
    try {
        const postId = req.params.id;
        const { userId } = req.body;
        const post = await Post.findById(postId);

        post.shares.push({ user_id: userId });

        await post.save();
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
}

// Bookmark a post
export async function bookmarkPost(req, res) {
    try {
        const postId = req.params.id;
        const { userId } = req.body;
        const post = await Post.findById(postId);

        post.bookmarks.push({ user_id: userId });

        await post.save();
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
}


// Repost a post
export async function repostPost(req, res) {
    try {
        const postId = req.params.id;
        const { userId } = req.body;
        const post = await Post.findById(postId);

        post.reposts.push({ user_id: userId });

        await post.save();
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
}




