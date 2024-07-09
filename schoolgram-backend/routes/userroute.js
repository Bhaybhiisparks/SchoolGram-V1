import express from "express";
import auth from "../middleware/authMiddleware.js";
import { getUserProfile } from "../controllers/usercontroller.js";
const router = express.Router();
// import { check } from "express-validator";


// user profile route
router.get((req, res, next) => {
    console.log(`Incoming request for user profile. User ID: ${req.params.id}`); // Log request start
    next();
},
auth.authenticateToken,
    (req, res, next) => {
        console.log(`Token verification successful for user ID: ${req.params.id}`); // Log successful token verification
        next();
    },
getUserProfile
    );


export default router;
