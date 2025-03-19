const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema(
    {
        fullname: {
            firstname: {
                type: String,
                required: [true, "First name is required"],
                minlength: [3, "First name must be at least 3 characters long"],
                trim: true,
            },
            lastname: {
                type: String,
                default: "",
                trim: true,
            },
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
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
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
        vehicle: {
            color: {
                type: String,
                required: [true, "Vehicle color is required"],
                minlength: [3, "Color must be at least 3 characters long"],
                trim: true,
            },
            plate: {
                type: String,
                required: [true, "Vehicle plate is required"],
                minlength: [4, "Plate must be at least 4 characters long"],
                trim: true,
                uppercase: true,
            },
            capacity: {
                type: Number,
                required: [true, "Vehicle capacity is required"],
                min: [1, "Capacity must be at least 1"],
            },
            vehicleType: {
                type: String,
                required: [true, "Vehicle type is required"],
                enum: ["car", "auto", "bike"],
            },
        },
        location: {
            latitude: {
                type: Number,
                 
            },
            longitude: {
                type: Number,
                 
            },
        },
    },
     
);

// Hash password before saving
captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}

// Compare password method
captainSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

// Generate JWT token
captainSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
};

const Captain = mongoose.model("Captain", captainSchema);
module.exports = Captain;
