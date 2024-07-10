import express from "express";
import User from "../models/User.js";
import auth from "../middleware/authMiddleware.js";
import { getUserProfile } from "../controllers/usercontroller.js";
const router = express.Router();



// user profile route
router.get('/:id', auth.authenticateToken, getUserProfile);


export default router;
