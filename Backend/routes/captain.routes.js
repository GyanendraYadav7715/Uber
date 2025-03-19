const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require("../middlewares/auth.middleware");

// Register Captain
router.post('/register', [
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters'),
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isLength({ min: 1 }).withMessage('Capacity must be at least 3 characters long'),
    body('vehicle.vehicleType').isIn(['car', 'auto', 'bike']).withMessage('Invalid'),
], captainController.registerCaptain);

router.post('/login', [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], captainController.loginCaptain);

//Get User Profile
router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);
router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;