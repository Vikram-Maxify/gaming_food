const axios = require("axios");
const FormData = require("form-data");

const uploadToImageBB = async (file) => {
  try {
    const formData = new FormData();

    const base64Image = file.buffer.toString("base64");

    formData.append("image", base64Image);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=478df32b636df51d74ba1b109e81dc67`,
      formData,
      {
        headers: formData.getHeaders(), // ✅ IMPORTANT
      }
    );

    return res.data.data.url;

  } catch (error) {
    console.error("IMGBB ERROR:", error.response?.data || error.message);
    throw new Error("Image upload failed");
  }
};

module.exports = uploadToImageBB;