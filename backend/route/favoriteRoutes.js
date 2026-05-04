const express = require("express");
const router = express.Router();

const {
  toggleFavorite,
  getFavorites,
} = require("../controllers/favoriteController");

const { isAuthenticated } = require("../middleware/auth");

// Add/Remove
router.post("/toggle", isAuthenticated, toggleFavorite);

// Get all
router.get("/", isAuthenticated, getFavorites);

module.exports = router;