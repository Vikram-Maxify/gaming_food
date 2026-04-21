// utils/send2Factor.js

const axios = require("axios");
const getOtpSettings = require("./getOtpSettings");

const send2Factor = async (mobile, otp) => {
    const settings = await getOtpSettings();

    const apiKey = settings.twoFactorApiKey;

    const url = `https://2factor.in/API/V1/${apiKey}/SMS/${mobile}/${otp}`;

    const response = await axios.get(url);

    if (response.data.Status !== "Success") {
        throw new Error("2Factor failed");
    }

    return true;
};

module.exports = send2Factor;