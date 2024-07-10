import User from "../models/User.js";

export async function getUserProfile(req, res) {
    const { id } = req.params;
    console.log('Fetching profile for user ID:', id); 

    try {
        const user = await User.findById(id);

        if (!user) {
            console.error('User not found');
            return res.status(404).json({
                status: "failed",
                message: "User not found",
            });
        }
        // debugging 
        console.log('User profile data:', user); // Log user data
        res.status(200).json({
            status: "success",
            data: user,
        });
    } catch (err) {
        console.error("Error fetching user profile:", err);
        if (!res.headersSent) {
            res.status(500).json({
                status: "error",
                message: "Internal Server Error",
            });
        }

    }
}
