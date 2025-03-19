const userModel = require("../models/user.model");
const userServices = require("../services/user.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");

// Register User
module.exports.registerUser = async (req, res) => {
    try {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password } = req.body;

        // Check if user already exists
        if (await userModel.findOne({ email })) {
            return res.status(400).json({ message: "User already exists." });
        }

        // Hash password
        const hashPassword = await userModel.hashPassword(password);

        // Create user
        const user = await userServices.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashPassword,
        });

        if (!user || typeof user.generateAuthToken !== "function") {
            return res.status(500).json({ error: "User creation failed or invalid user object" });
        }

        // Generate token
        const token = user.generateAuthToken();

        res.status(201).json({ token, user });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

// Login User
module.exports.loginUser = async (req, res) => {
    try {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Find user and select password field
        const user = await userModel.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate token & set cookie
        const token = user.generateAuthToken();
        res.cookie("token", token, { httpOnly: true, secure: true });

        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

// Get User Profile
module.exports.getUserProfile = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

// Logout User
module.exports.logoutUser = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }

        await blacklistTokenModel.create({ token });
        res.clearCookie("token");

        res.status(200).json({ message: "Logged Out" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};
