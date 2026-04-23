const express = require("express");
const router = express.Router();

const admin = require("../middleware/adminMiddleware");

const {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  logoutAdmin,
  getusers,
} = require("../admincontroller/adminAuthController");
const { updateOtpSettings } = require("../admincontroller/adminOtpController");
const protectAdmin = require("../middleware/Adminauthmiddleware");


// 🔓 Public
router.post("/login", loginAdmin);

// ⚠️ Optional (you can remove in production)
router.post("/register", registerAdmin);



// 🔐 Admin Protected
router.get("/users",protectAdmin,admin,getusers);

router.get("/profile", protectAdmin, admin, getAdminProfile);
router.post("/otp-settings",protectAdmin,admin, updateOtpSettings);
router.post("/logout", protectAdmin, admin, logoutAdmin);



module.exports = router;