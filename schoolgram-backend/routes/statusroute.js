import express from "express";
import { createStatus, updateStatus } from "../controllers/statuscontroller.js";
import auth from "../middleware/authMiddleware.js"

const router = express.Router();


router.post('/status', 
    // auth.authenticateToken, 
    createStatus);


router.put('/status/:id', 
    // auth.authenticateToken, 
    updateStatus);



export default router;