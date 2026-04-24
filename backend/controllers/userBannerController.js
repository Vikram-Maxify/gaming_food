const Banner = require("../models/Banner");

// GET ACTIVE BANNERS
exports.getActiveBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true }).sort({
      createdAt: -1,
    });

    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE BANNER
exports.getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner || !banner.isActive) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};