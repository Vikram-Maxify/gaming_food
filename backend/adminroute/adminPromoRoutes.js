const express = require("express");
const router = express.Router();

const {
  createPromo,
  getAllPromos,
  deletePromo,
} = require("../admincontroller/adminPromoController");
const protectAdmin = require("../middleware/Adminauthmiddleware");


// 🔐 middleware apply

// ✅ create promo
router.post("/create",protectAdmin, createPromo);

// ✅ get all promos
router.get("/", getAllPromos);

// ✅ delete promo
router.delete("/:id", deletePromo);

module.exports = router;