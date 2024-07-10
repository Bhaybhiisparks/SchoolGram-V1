import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { loadConfig } from '../config/configindex.js';

// Load configuration
const { JWT_SECRET } = loadConfig();

const generateToken = (userId) => {
    try {
        console.log('Generating token for user ID:', userId); // Log the user ID

        const payload = { userId };
        console.log('Payload:', payload); // Log the payload

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30m' }); 
        console.log('Generated token:', token); // Log the generated token

        return token;
    } catch (error) {
        console.error('Error generating token:', error); // Log any errors that might occur
        throw error; 
    }

};



const authenticateToken = async (req, res, next) => {
    // Extract token from authorization header if present
    const authHeader = req.headers.authorization;
    const token = req.cookies.SessionID || (authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null);

    // Debugging 
    console.log('Auth Header:', authHeader); // Log auth header
    console.log('Token from cookies:', req.cookies.SessionID); // Log token from cookies
    console.log('Extracted token:', token); // Log extracted token

    if (!token) {
        console.error('No token provided');
        return res.status(401).json({ message: "Access denied" });
    }

    try {
        console.log('Received token to authenticateToken:', token); 
        // Verify the token using JWT_SECRET
        const decoded = jwt.verify(token, JWT_SECRET);

        // Debugging 
        console.log('Token successfully verified'); // Log successful verification
        console.log('Decoded payload:', decoded);  // Log payload

        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user; // Attached user to the request object
        next();
    } catch (err) {
        console.error('Token verification error at authenticateToken:', err.message);
        return res.status(403).json({ message: "Invalid token" });
    }
};



export default { generateToken, authenticateToken };




// const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1]; // Extract token


//     if (token == null) {
//         {
//             return res.status(401).json({ // No token, Unauthorized
//                 status: 'failed',
//                 message: 'No token provided',
//             });
//         }
//     } 

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403); // Invalid token, Forbidden
//         req.user = user;
//         next();
//     });



    // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    //     if (err) {
    //         console.error('Token verification error:', err);
    //         return res.status(403).json({
    //             status: 'failed',
    //             message: 'Forbidden: Invalid token',
    //         });
    //     }
    
    //     // Assuming 'decoded' contains user information like 'userId' and 'email'
    //     const { userId, email } = decoded;
    
    //     // Optionally,  fetch user details from the database based on 'userId' or use 'email' as needed
    //     // Example:
    //     // User.findById(userId, (err, user) => {
    //     //     if (err || !user) {
    //     //         return res.status(404).json({
    //     //             status: 'failed',
    //     //             message: 'User not found',
    //     //         });
    //     //     }
    //     //     req.user = user;
    //     //     next();
    //     // });
    
    //     // Attach the user information to the request object
    //     req.user = { userId, email };
    //     next();
    // });
    




