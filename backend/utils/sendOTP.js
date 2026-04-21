const axios = require("axios");

const sendOTP = async (mobile, otp) => {
    const apiKey = process.env.TWO_FACTOR_API_KEY;

    const url = `https://2factor.in/API/V1/${apiKey}/SMS/${mobile}/${otp}`;

    const response = await axios.get(url);

    return response.data;
};

module.exports = sendOTP;