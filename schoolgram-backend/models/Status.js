import mongoose from "mongoose";

const StatusSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true,
            trim: true
        },
        media: {
            type: [String],
            default: []
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        visibility: {
            type: String,
            enum: ['Public', 'Private'],
            default: 'Public'
        }
    }
);

export default mongoose.model('status', StatusSchema);
