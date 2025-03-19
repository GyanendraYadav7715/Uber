const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../services/userService");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", verifyToken, getUserProfile);

module.exports = router;
