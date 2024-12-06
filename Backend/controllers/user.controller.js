const userModel = require('../models/user.model');
const userServices = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log(req.body);

        const { fullname, email, password } = req.body;

         

        const hashPassword = await userModel.hashPassword(password);
        const user = await userServices.createUser({
            firstname:fullname.firstname,
            lastname:fullname.lastname,  
            email,
            password: hashPassword,
        });

        if (!user || typeof user.generateAuthToken !== 'function') {
            return res.status(500).json({ error: 'User creation failed or invalid user object' });
        }

        const token = user.generateAuthToken();

        res.status(201).json({ token, user });
    } catch (err) {
        console.error('Error registering user:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
