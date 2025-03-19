const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: [true, "First name is required"],
      minlength: [3, "First name must be at least 3 characters long"],
    },
    lastname: {
      type: String,
      default: "",
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  socketId: {
    type: String,
    default: "",
  },
}, { timestamps: true });

// Hash password before saving
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10)
}

// Compare password method
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
};

const User = mongoose.model("User", userSchema);
module.exports = User;
