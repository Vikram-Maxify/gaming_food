const express = require("express");
const router = express.Router();

const {
  chefLogin,
  chefProfile,
  chefLogout
} = require("../controllers/chefController");
const protect = require("../middleware/authmiddleware");
const chefOnly = require("../middleware/chefOnly");



// 🔐 LOGIN
router.post("/login", chefLogin);


// 👨‍🍳 PROFILE
router.get("/profile", protect, chefOnly, chefProfile);


// 🚪 LOGOUT
router.post("/logout", protect, chefOnly, chefLogout);


module.exports = router;