import express from "express";
import Validate from "../middleware/validate.js";
import { check } from "express-validator";
import { Register, Login } from "../controllers/authcontroller.js";
import tokenMiddleware from "../middleware/authMiddleware.js";

// import responseFunctions from "../middleware/logREQnRES.js"
// const logLoginResponse = responseFunctions.logLoginResponse;
// const logRequestAndResponse = responseFunctions.logRequestAndResponse;

const router = express.Router();
const verifyToken = tokenMiddleware.verifyToken;
const authenticateToken = tokenMiddleware.authenticateToken;


// route to verifytoken
router.get('/verify-token', authenticateToken, verifyToken); 


// Register route -- POST request
router.post(
    "/register",
    // logRequestAndResponse,
    check("email")
        .isEmail()
        .withMessage("Enter a valid email address")
        .normalizeEmail(),
    check("first_name")
        .not()
        .isEmpty()
        .withMessage("You first name is required")
        .trim()
        .escape(),
    check("last_name")
        .not()
        .isEmpty()
        .withMessage("You last name is required")
        .trim()
        .escape(),
    check("institution")
        .not()
        .isEmpty()
        .withMessage("You institution is required")
        .trim()
        .escape(),
    check("department")
        .not()
        .isEmpty()
        .withMessage("You department is required")
        .trim()
        .escape(),
    check("level")
        .not()
        .isEmpty()
        .withMessage("You level is required")
        .trim()
        .escape(),
    check("password")
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage("Must be at least 8 chars long"),
    Validate,
    Register
);


// Login route == POST request
router.post(
    "/login",
    // logRequestAndResponse,
    // logLoginResponse,
    check("email")
        .isEmail()
        .withMessage("Please enter a valid email address")
        .normalizeEmail(),
    check("password").not().isEmpty(),
    Validate,
    Login
    // add a check department and firstname later on
);



// Logout route == POST REQUEST



export default router;