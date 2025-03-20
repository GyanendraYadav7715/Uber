const express = require("express");
const { registerCaptain, loginCaptain, getCaptainProfile } = require("../services/captainService");
const { verifyToken } = require("../middleware/authMiddleware");
 

const router = express.Router();

router.post("/register", registerCaptain);
router.post("/login", loginCaptain);
//router.get("/profile", verifyToken, getCaptainProfile);

module.exports = router;
