// utils/sendOTP.js

const send2Factor = require("./send2Factor");
const sendFast2SMS = require("./sendFast2SMS");
const getOtpSettings = require("./getOtpSettings");

const sendOTP = async (mobile, otp) => {
    const settings = await getOtpSettings();

    try {
        // 🔥 Priority based
        if (settings.provider === "2factor" && settings.is2FactorActive) {
            await send2Factor(mobile, otp);
            console.log("OTP sent via 2Factor");
            return;
        }

        if (settings.provider === "fast2sms" && settings.isFast2SMSActive) {
            await sendFast2SMS(mobile, otp);
            console.log("OTP sent via Fast2SMS");
            return;
        }

        throw new Error("No active OTP provider");

    } catch (error) {
        console.log("Primary failed, trying fallback...");

        // 🔁 fallback logic
        if (settings.isFast2SMSActive) {
            await sendFast2SMS(mobile, otp);
            console.log("Fallback: Fast2SMS success");
            return;
        }

        if (settings.is2FactorActive) {
            await send2Factor(mobile, otp);
            console.log("Fallback: 2Factor success");
            return;
        }

        throw new Error("All OTP providers failed");
    }
};

module.exports = sendOTP;