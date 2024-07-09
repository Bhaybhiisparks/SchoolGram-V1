import dotenv from "dotenv";

 export function loadConfig() {
    // const result = dotenv.config();
    // if (result.error) {
    //     throw result.error;
    // }
    dotenv.config();

    return {
        URI: process.env.URI,
        PORT: process.env.PORT,
        SECRET_ACCESS_TOKEN: process.env.SECRET_ACCESS_TOKEN,
        JWT_SECRET: process.env.JWT_SECRET
    };
}

