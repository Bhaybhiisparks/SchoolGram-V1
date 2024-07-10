import jwt from  "jsonwebtoken";
import { loadConfig } from '../config/configindex.js';

// Load configuration
const { JWT_SECRET } = loadConfig();



// middleware to trace outgoing responses
function logRequestAndResponse(req, res, next) {
    console.log(`Received ${req.method} request for ${req.url}`);
    console.log('Request Body:', req.body);
    next();
}


// middleware to trace login backend NETWORK parameters 
function logLoginResponse(req, res, next) {
    console.log('Request Headers:', req.headers);
    console.log('Cookies:', req.cookies);

    const authHeader = req.headers.authorization 
    let token = 'No token provided';

    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }

    console.log('Token:', token);

    if (token !== 'No token provided') {
        try {
            const decodedToken = jwt.verify(token, JWT_SECRET );
            console.log('Decoded Token:', decodedToken);
            // console.log('User ID:', decodedToken.userId); 
        } catch (err) {
            console.log('Invalid token:', err.message);
        }
    }

    // debugging tip 
    // capture response headers and status by listening to the response finish event.
    res.on('finish', () => {
        console.log('Response Status Code:', res.statusCode);
        console.log('Response Headers:', res.getHeaders());
    });
    next();
}

export default { logRequestAndResponse, logLoginResponse };
