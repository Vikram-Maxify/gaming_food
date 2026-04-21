const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    credit: {
        type: Number,
        default: 0

    },
    tableNumber: {
        type: String,
    },
    role: {
        type: String,
        default: "user"
    },
    otp: String,
    otpExpire: Date,
    isTwoFactorEnabled: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })


const Auth = mongoose.model("Auth", authSchema);
module.exports = Auth;