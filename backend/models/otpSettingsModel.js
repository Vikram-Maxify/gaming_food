// models/otpSettingsModel.js

const mongoose = require("mongoose");

const otpSettingsSchema = new mongoose.Schema({
    provider: {
        type: String,
        enum: ["2factor", "fast2sms"],
        default: "2factor",
    },

    is2FactorActive: {
        type: Boolean,
        default: true,
    },

    isFast2SMSActive: {
        type: Boolean,
        default: true,
    },

    twoFactorApiKey: {
        type: String,
        default: "",
    },

    fast2smsApiKey: {
        type: String,
        default: "",
    }

}, { timestamps: true });

module.exports = mongoose.model("OtpSettings", otpSettingsSchema);