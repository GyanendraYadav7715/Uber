const userModel = require('../models/user.model');
const userServices = require("../services/user.service")
const { validationResult } =require("../routes/user.routes")
module.exports.registerUser=async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return  res.status(400).json({errors:errors.array()})
    }
    const { firstname, lastname, email, password } = req.body;
    const hashPassword = await userModel.hashPassword(password);
    const user = await userServices.createUser({
        firstname,
        lastname,
        email,
        password: hashPassword
    })
    const token = user.generateAuthToken();
    res.status(201).json(token, user);
}