const express = require("express");
const router = express.Router();

const protect = require("../middleware/authmiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  logoutAdmin,
} = require("../admincontroller/adminAuthController");


// 🔓 Public
router.post("/login", loginAdmin);

// ⚠️ Optional (you can remove in production)
router.post("/register", registerAdmin);


// 🔐 Admin Protected
router.get("/profile", protect, admin, getAdminProfile);
router.post("/logout", protect, admin, logoutAdmin);


module.exports = router;