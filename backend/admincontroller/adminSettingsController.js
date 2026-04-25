const WebsiteSettings = require("../models/WebsiteSettings");
const uploadToImageBB = require("../utils/uploadToImageBB");

// 🔹 Create or Update Settings
exports.updateSettings = async (req, res) => {
  try {
    const { title } = req.body;

    let settings = await WebsiteSettings.findOne();

    // 🟢 Image upload only if file exists
    let logoUrl;
    if (req.file) {
      logoUrl = await uploadToImageBB(req.file);
    }

    if (settings) {
      // update only if provided
      if (title) settings.title = title;
      if (logoUrl) settings.logo = logoUrl;

      await settings.save();
    } else {
      // create new (only provided fields)
      settings = await WebsiteSettings.create({
        title: title || "",
        logo: logoUrl || "",
      });
    }

    res.status(200).json({
      message: "Settings updated successfully",
      settings,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Get Settings
exports.getSettings = async (req, res) => {
  try {
    const settings = await WebsiteSettings.findOne();
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};