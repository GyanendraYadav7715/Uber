const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");

// Register Captain
module.exports.registerCaptain = async (req, res) => {
    try {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { fullname, email, password, vehicle } = req.body;
        email = email.toLowerCase(); // Convert to lowercase

        // Check if Captain already exists (case-insensitive)
        if (await captainModel.findOne({ email })) {
            return res.status(400).json({ message: "Captain already exists." });
        }

        // Hash password
        const hashPassword = await captainModel.hashPassword(password);

        // Create Captain
        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,  // Use lowercase email
            password: hashPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType,
        });

        // Generate Token
        const token = captain.generateAuthToken();

        res.status(201).json({ token, captain });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};


// Login Captain
module.exports.loginCaptain = async (req, res) => {
    try {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Find Captain & select password
        const captain = await captainModel.findOne({ email }).select("+password");
        if (!captain) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Compare Passwords
        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate Token & Set Cookie
        const token = captain.generateAuthToken();
        res.cookie("token", token, { httpOnly: true, secure: true });

        res.status(200).json({ token, captain });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

// Get Captain Profile
module.exports.getCaptainProfile = async (req, res) => {
    try {
        res.status(200).json(req.captain);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

// Logout Captain
module.exports.logoutCaptain = async (req, res) => {
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
