// utils/getOtpSettings.js

const OtpSettings = require("../models/otpSettingsModel");

const getOtpSettings = async () => {
    let settings = await OtpSettings.findOne();

    if (!settings) {
        settings = await OtpSettings.create({});
    }

    return settings;
};

module.exports = getOtpSettings;