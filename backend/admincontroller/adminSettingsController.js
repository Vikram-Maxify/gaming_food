const WebsiteSettings = require("../models/WebsiteSettings");
const uploadToImageBB = require("../utils/uploadToImageBB");


// 🔹 Create or Update Settings
exports.updateSettings = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !req.file) {
      return res.status(400).json({ message: "Title and logo required" });
    }

    const logoUrl = await uploadToImageBB(req.file);

    let settings = await WebsiteSettings.findOne();

    if (settings) {
      // update
      settings.title = title;
      settings.logo = logoUrl;
      await settings.save();
    } else {
      // create
      settings = await WebsiteSettings.create({
        title,
        logo: logoUrl,
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