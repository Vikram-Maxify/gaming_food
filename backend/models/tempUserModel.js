const mongoose = require("mongoose");

const tempUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    otp: String,
    otpExpire: Date

}, { timestamps: true });

const TempUser = mongoose.model("tempUser", tempUserSchema);

module.exports = TempUser;