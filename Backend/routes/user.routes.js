const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const usercontroller = require("../controllers/user.controller")


router.post('/register',[
        body('fullname.firstname').isLength({ min: 3 }).withMessage('Frist namemust be at least '),
        body('email').isEmail().withMessage('Enter a valid email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],usercontroller.registerUser
);

router.post('/login',[
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],usercontroller.loginUser)

module.exports = router;
