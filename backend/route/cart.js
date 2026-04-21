const express = require("express");
const router = express.Router();

const {
  addToCart,
  removeFromCart,
  updateQuantity,
  getCart,
} = require("../controllers/cartController");

const auth = require("../middleware/authMiddleware");

// 🛒
router.post("/add", auth, addToCart);

// ❌
router.post("/remove", auth, removeFromCart);

// 🔄
router.put("/update", auth, updateQuantity);

// 📦
router.get("/", auth, getCart);

module.exports = router;