const express = require("express");
const router = express.Router();

const {
  toggleFavorite,
  getFavorites,
} = require("../controllers/favoriteController");

const protect = require("../middleware/authmiddleware");

// Add/Remove
router.post("/toggle", protect, toggleFavorite);

// Get all
router.get("/", protect, getFavorites);

module.exports = router;