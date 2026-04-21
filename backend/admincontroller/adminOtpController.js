// controllers/adminOtpController.js

const OtpSettings = require("../models/otpSettingsModel");

exports.updateOtpSettings = async (req, res) => {
    try {
        const data = req.body;

        let settings = await OtpSettings.findOne();

        if (!settings) {
            settings = new OtpSettings(data);
        } else {
            Object.assign(settings, data);
        }

        await settings.save();

        res.json({
            success: true,
            message: "OTP settings updated",
            settings
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};