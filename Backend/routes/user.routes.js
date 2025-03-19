const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const usercontroller = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Register User
router.post('/register', [
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters'),
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], usercontroller.registerUser);

// Login User
router.post('/login', [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], usercontroller.loginUser);

// Get User Profile
router.get('/profile', authMiddleware.authUser, usercontroller.getUserProfile);
router.get('/logout', authMiddleware.authUser, usercontroller.logoutUser);
module.exports = router;
