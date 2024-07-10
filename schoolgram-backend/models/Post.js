import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        first_name:{
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        institution: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        content: {
            type: String, 
            required: true
        },
        visibility: {
            type: String,
            enum: ['public', 'private', 'restricted'],
            default: 'public'
        },
        picturePath: String,
        userPicturePath : String,
        likes: {
            type: Map,
            of: Boolean,
        },
        comments: [{
            user_id: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'User' 
            },
            content: { type: String },
            created_at: { type: Date, default: Date.now }
          }],
          shares: [{
            user_id: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'User' 
            },
            shared_at: { type: Date, default: Date.now }
        }],
        bookmarks: [{
            user_id: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'User' 
            },
            bookmarked_at: { type: Date, default: Date.now }
        }],
        reposts: [{
            user_id: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'User' 
            },
            reposted_at: { type: Date, default: Date.now }
        }],
        views: {
            type: Number,
            default: 0,
        },
    },
    {timestamps: true}
);


export default mongoose.model("post", PostSchema);





