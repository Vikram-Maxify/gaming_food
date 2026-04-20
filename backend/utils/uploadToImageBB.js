const axios = require("axios");

const uploadToImageBB = async (file) => {
  const base64Image = file.buffer.toString("base64");

  const url = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`;

  const response = await axios.post(url, {
    image: base64Image,
  });

  return response.data.data.url; // return only image URL
};

module.exports = uploadToImageBB;