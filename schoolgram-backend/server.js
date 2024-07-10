import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";


// ROUTES
import App from "./routes/indexroute.js";
import userAuth from "./routes/authroute.js"; 
import userRoute from "./routes/userroute.js";
import postRoute from "./routes/postroute.js";
import statusRoute from "./routes/statusroute.js";



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


// CONFIGURE HEADER INFORMATION
// Allow request from any source. In real production, this should be limited to allowed origins only
server.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
    credentials: true,
}));
server.disable("x-powered-by"); //Reduce fingerprinting
server.use(cookieParser());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
// app.use(bodyParser.json());



mongoose.connect(process.env.URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>{
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`));
}).catch ((error) => console.log(`${error} server could not be connected`));

    
//  CONFIGURE ROUTES
server.use ("/", App);
server.use ("/", userAuth );
server.use("/user", userRoute);
server.use("/", postRoute);
server.use("/", statusRoute);