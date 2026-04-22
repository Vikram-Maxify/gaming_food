const express = require("express");
const router = express.Router();

const {
  applyPromo,
} = require("../controllers/userPromoController");
const protect = require("../middleware/authmiddleware");

// 🔐 user auth
router.use(protect);

// ✅ apply promo
router.post("/apply", applyPromo);

module.exports = router;