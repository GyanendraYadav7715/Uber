const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const   jwt= require('jsonwebtoken');
const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "Frist name must be 3 charcter long"],
    },
    lastname: {
      type: String,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select:false
  },
  socketId: {
    type: String,
  },
});

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10)
}
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET,{expiresIn:"24h"})
  return token;
}

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;