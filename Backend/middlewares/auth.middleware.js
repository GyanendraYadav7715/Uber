const userModel = require("../models/user.model");
const captainModel = require("../models/captain.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model");

// Reusable function to verify token
const verifyToken = async (req) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Unauthorized");

    // Check if token is blacklisted
    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted) throw new Error("Unauthorized");

    // Verify JWT
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

// Middleware to authenticate User
module.exports.authUser = async (req, res, next) => {
    try {
        const decoded = await verifyToken(req);
        const user = await userModel.findById(decoded._id);
        if (!user) return res.status(401).json({ message: "Unauthorized" });

        req.user = user;
        return next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

// Middleware to authenticate Captain
module.exports.authCaptain = async (req, res, next) => {
    try {
        const decoded = await verifyToken(req);
        const captain = await captainModel.findById(decoded._id);
        if (!captain) return res.status(401).json({ message: "Unauthorized" });

        req.captain = captain;
        return next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
