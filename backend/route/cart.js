const express = require("express");
const router = express.Router();

const {
  addToCart,
  removeFromCart,
  updateQuantity,
  getCart,
} = require("../controllers/cartController");

const protect = require("../middleware/authmiddleware");


// 🛒
router.post("/add",protect , addToCart);

// ❌
router.post("/remove",protect , removeFromCart);

// 🔄
router.put("/update",protect , updateQuantity);

// 📦
router.get("/",protect , getCart);

module.exports = router;