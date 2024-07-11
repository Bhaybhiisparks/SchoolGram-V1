import User from "../models/User.js";
// import jwt from  "jsonwebtoken";
import bcrypt from "bcrypt";
import auth from "../middleware/authMiddleware.js";






// register controller 
export async function Register(req, res) {
    const { first_name, last_name, institution, department, email, password, level } = req.body;
    try {
        // create an instance of a user
        const newUser = new User({
            first_name,
            last_name,
            institution, 
            department,
            email,
            password,
            level
        });
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "Email is already associated with an account, please log in.",
            });
        // else save new user into the database
        const savedUser = await newUser.save(); 
        //recheck this part of the code
        const { role, ...user_data } = savedUser._doc;
        res.status(200).json({
            status: "success",
            data: [user_data],
            message:
                "Successfully registered, please login",
        });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
    res.end();
}


export async function Login(req, res) {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            console.error("User not found");
            return res.status(401).json({
                status: "failed",
                data: [],
                message: "Invalid email or password. Please try again with the correct credentials.",
            });
        }
        
        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.error("Invalid password");
            return res.status(401).json({
                status: "failed",
                data: [],
                message: "Invalid email or password. Please try again with the correct credentials.",
            });
        }
        
        // Return user info except password
        const { password: _, ...user_data } = user._doc;

        // Token options
        const options = {
            expires: new Date(Date.now() + 3600000), // Expires in 2 hours
            httpOnly: true, 
            // secure: process.env.NODE_ENV === 'production', // Set secure only in production
            // sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // SameSite setting
        };

        // Extract userId
        const userId = user._id.toString();

        // Generate token using the userId
        const token = auth.generateToken(userId);

        // Set the token to response cookie
        res.cookie("SessionID", token, options);

        res.status(200).json({
            status: "success",
            data: { user: user_data, token },
            message: "You have successfully logged in.",
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
}

// export async function Logout 