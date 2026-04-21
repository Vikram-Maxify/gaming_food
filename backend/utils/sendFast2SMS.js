// utils/sendFast2SMS.js

const axios = require("axios");
const getOtpSettings = require("./getOtpSettings");

const sendFast2SMS = async (mobile, otp) => {
    const settings = await getOtpSettings();

    const apiKey = settings.fast2smsApiKey;

    const response = await axios.post(
        "https://www.fast2sms.com/dev/bulkV2",
        {
            route: "otp",
            variables_values: otp,
            numbers: mobile,
        },
        {
            headers: {
                authorization: apiKey,
            },
        }
    );

    if (!response.data.return) {
        throw new Error("Fast2SMS failed");
    }

    return true;
};

module.exports = sendFast2SMS;