const mongoose = require("mongoose");

const websiteSettingsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    logo: {
      type: String, // store image URL (Cloudinary / ImageBB / local)
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WebsiteSettings", websiteSettingsSchema);