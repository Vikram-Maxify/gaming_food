const express = require("express");
const router = express.Router();

const {
  createPromo,
  getAllPromos,
  deletePromo,
} = require("../admincontroller/adminPromoController");
const admin = require("../middleware/adminMiddleware");
const protect = require("../middleware/authmiddleware");


// 🔐 middleware apply
router.use(protect, admin);

// ✅ create promo
router.post("/create", createPromo);

// ✅ get all promos
router.get("/", getAllPromos);

// ✅ delete promo
router.delete("/:id", deletePromo);

module.exports = router;