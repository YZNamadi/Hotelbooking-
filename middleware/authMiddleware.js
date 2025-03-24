const jwt = require("jsonwebtoken");
require("dotenv").config();
const userModel = require("../models/user");

exports.authenticate = async (req, res, next) => {
    try {
        // Extract the token from the request header
        const authHeader = req.header("Authorization");

        // Check if token is provided
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Access denied. No token provided or invalid format",
            });
        }

        const token = authHeader.split(" ")[1];

        // Verify if the token is valid and not expired
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Check for the user and throw an error if not found
        const user = await userModel.findById(decodedToken.userId);
        if (!user) {
            return res.status(404).json({
                message: "Authentication failed: User not found",
            });
        }

        req.user = decodedToken;
        next();
    } catch (error) {
        console.error("Authentication Error:", error.message);

        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                message: "Session timed out. Please log in again.",
            });
        }

        res.status(500).json({
            message: "Internal server error",
        });
    }
};

// Ensure only super admins can access certain routes
exports.superAdminAuth = async (req, res, next) => {
    try {
        if (req.user.isSuperAdmin) {
            next();
        } else {
            return res.status(403).json({
                message: "Unauthorized: Only super admins can perform this action",
            });
        }
    } catch (error) {
        console.error("Super Admin Auth Error:", error.message);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};
