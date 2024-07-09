import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
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
          }]
    },
    {timestamps: true}
);


export default mongoose.model("post", PostSchema);





