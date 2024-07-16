import express from "express";
const router = express.Router();

router.get('/:user/accountspanel', (req, res) => {
    console.log('Received request at accounts panel endpoint');
    // const userId = req.params.userId;
    try {
        res.status(200).json({
            status: "success",
            data: [],
            message: "Welcome to my Schoolgram welcomebackpage (login or signup)!",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
  });


export default router;