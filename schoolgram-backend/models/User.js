import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


import { loadConfig } from "../config/configindex.js";
const { URI, PORT, SECRET_ACCESS_TOKEN } = loadConfig();
console.log(`URI: ${URI}`);
console.log(`PORT: ${PORT}`);
console.log(`SECRET_ACCESS_TOKEN: ${SECRET_ACCESS_TOKEN}`);



const UserSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: "Your firstname is required",
            max: 25,
        },
        last_name: {
            type: String,
            required: "Your lastname is required",
            max: 25,
        },
        institution: {
            type: String,
            required: true,
            min: 6,
            max: 50,
        },
        department: {
            type: String,
            required: true,
            min: 6,
            max: 30,
        },
        email: {
            type: String,
            required: "Your email is required",
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: "Your password is required",
            select: false,
            max: 25,
        },
        role: {
            type: String,
            required: true,
            default: "0x01",
        },
        picturePath: {
            type: String,
            default: "",
        },
        friends: {
            type: Array,
            default: [],
        },
        status: {
            type: String,
            min: 1,
            max: 100,
        },

        location: String,
        level: String,
        posts: {
            type: Number,
            default: 0,
        },
        followers: {
            type: Number,
            default: 0,
        },
        following: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

UserSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

// function useSChema to sign in the user ID with a secret key & generates a token that expires in 30mins
// you created a new startpoint for this in authcontroller 
UserSchema.methods.generateAccessJWT = function () {
    let payload = {
      id: this._id,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '30m',
    });
  };




export default mongoose.model("users", UserSchema);