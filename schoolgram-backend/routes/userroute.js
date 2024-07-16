import express from "express";
// import auth from "../middleware/authMiddleware.js";
import { getUserProfile } from "../controllers/usercontroller.js";
const router = express.Router();

// const verifyFrontendToken = auth.verifyFrontendToken;



// user profile route
// router.get('/user/:id', auth.authenticateToken, getUserProfile);

router.get('/:id', getUserProfile);

export default router;
