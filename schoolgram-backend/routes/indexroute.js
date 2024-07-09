import express from "express";
const app = express();



app.get ("/", (req, res) =>{
    console.log('Received request at WELCOMEPAGE endpoint');

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
    
})


app.get ("/home", (req, res) =>{
    try {
        res.status(200).json({
            status: "success",
            data: [],
            message: "Welcome to my Schoolgram home page!",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
})



export default app;

