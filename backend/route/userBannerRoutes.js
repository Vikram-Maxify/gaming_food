const express = require("express");
const router = express.Router();

const {
  getActiveBanners,
  getBannerById,
} = require("../controllers/userBannerController");

// ✅ USER ROUTES

// Get all active banners (homepage etc.)
router.get("/", getActiveBanners);

// Get single banner
router.get("/:id", getBannerById);

module.exports = router;
