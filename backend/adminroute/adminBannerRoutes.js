const express = require("express");
const router = express.Router();

const {
  createBanner,
  updateBanner,
  deleteBanner,
  getAllBannersAdmin,
} = require("../controllers/adminBannerController");

const { protect, adminOnly } = require("../middleware/auth");

const upload = require("../middleware/multer");

// ===============================
// ✅ ADMIN ONLY ROUTES
// ===============================

// CREATE BANNER (with images upload)
router.post(
  "/",
  protect,
  adminOnly,
  upload.array("images", 6),
  createBanner
);

// UPDATE BANNER (optional new images)
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.array("images", 6),
  updateBanner
);

// DELETE BANNER
router.delete("/:id", protect, adminOnly, deleteBanner);

// GET ALL BANNERS (ADMIN VIEW)
router.get("/all", protect, adminOnly, getAllBannersAdmin);

module.exports = router;