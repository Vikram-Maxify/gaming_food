const mongoose = require("mongoose");

const websiteSettingsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },

    logo: {
      type: String, // store image URL (Cloudinary / ImageBB / local)
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WebsiteSettings", websiteSettingsSchema);