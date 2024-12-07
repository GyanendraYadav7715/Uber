const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
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
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'], 
    },

    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active','inactive'],
        default:'active'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength:[3,'Color must be at least 3 charcter long']
        },
        plate: {
            type: String,
            required: true,
            minlength: [4, 'Plate must be at least 4 charcter long']
        },
        capacity: {
            type:Number,
            required: true,
            min: [1, ' Number must be at least 1 charcter long']
        },
        vehicleType: {
            type: String,
            required: true,
            enum:['car','auto','bike']
        }
    },
    location: {
        latitude: {
            type:Number
        },
        longitude: { 
            type: Number
        }
    }
})
captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id
    }, process.env.JWT_SECRET, { expiresIn: "24h" })
    return token;
}
captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)

}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}


const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;