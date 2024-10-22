import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import bodyParser from "body-parser";

// ROUTES
import App from "./routes/indexroute.js";
import userAuth from "./routes/authroute.js"; 
import userRoute from "./routes/userroute.js";
import postRoute from "./routes/postroute.js";
import statusRoute from "./routes/statusroute.js";
import settingsRoute from "./routes/settingsroute.js"



// config files
import { loadConfig } from "./config/configindex.js";
// import authenticateToken from "./middleware/authMiddleware.js";
const { URI, PORT, SECRET_ACCESS_TOKEN, JWT_SECRET } = loadConfig();
console.log(`URI: ${URI}`);
console.log(`PORT: ${PORT}`);
console.log(`SECRET_ACCESS_TOKEN: ${SECRET_ACCESS_TOKEN}`);
console.log(`JWT SECRET: ${JWT_SECRET}`);



//creating a server
//change server to app later on
const server = express();


// Error handling middleware 
// server.use((err, req, res, next) => {
//     console.error("Unhandled error:", err); 
//     res.status(500).json({ status: 'error', message: 'Internal Server Error' });
// });


// CONFIGURE HEADER INFORMATION
// Allow request from any source. In real production, this should be limited to allowed origins only
server.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
server.disable("x-powered-by"); //Reduce fingerprinting
server.use(cookieParser());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(bodyParser.json());
server.options('*', cors());




mongoose.connect(process.env.URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>{
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`));
}).catch ((error) => console.log(`${error} server could not be connected`));

    
//  CONFIGURE ROUTES
server.use ("/", App);
server.use ("/", userAuth );
server.use("/", userRoute);
server.use("/post", postRoute);
server.use("/", statusRoute);
server.use("/", settingsRoute)