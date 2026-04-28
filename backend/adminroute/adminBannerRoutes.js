const express = require("express");
const router = express.Router();

const {
  createBanner,
  updateBanner,
  deleteBanner,
  getAllBannersAdmin,
} = require("../admincontroller/adminBannerController");


// 📌 multer middleware (image upload)
const protect = require("../middleware/authmiddleware");
const admin = require("../middleware/adminMiddleware");
const protectAdmin = require("../middleware/Adminauthmiddleware");
const upload = require("../middleware/upload");

// ===============================
// ✅ ADMIN ONLY ROUTES
// ===============================

// CREATE BANNER (with images upload)
router.post(
  "/create",
  protectAdmin,
  admin,
  upload.array("images", 6),
  createBanner
);

// UPDATE BANNER (optional new images)
router.put(
  "/:id",
  protectAdmin,
  admin,
  upload.array("images", 6),
  updateBanner
);

// DELETE BANNER
router.delete("/:id", protectAdmin, admin, deleteBanner);

// GET ALL BANNERS (ADMIN VIEW)
router.get("/all", protectAdmin, admin, getAllBannersAdmin);

module.exports = router;