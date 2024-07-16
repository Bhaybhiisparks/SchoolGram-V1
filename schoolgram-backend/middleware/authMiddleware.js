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
        console.error('Error generating token:', error); 
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


const verifyFrontendToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json({ message: 'Invalid token.' });
    }
  };


export default { generateToken, authenticateToken, verifyFrontendToken };


    




