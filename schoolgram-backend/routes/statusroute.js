import express from "express";
import auth from "../middleware/authMiddleware.js"
import { validatePostCreation } from "../middleware/validate.js";
import {createOrUpdateStatus, getCurrentStatus} from "../controllers/statuscontroller.js"

const router = express.Router();


router.get('/:user/status',
    getCurrentStatus);

router.post('/:user/poststatus', 
    // auth.authenticateToken, 
    createOrUpdateStatus);


// router.put('/status/:id', 
//     // auth.authenticateToken, 
//     updateStatus);



export default router;