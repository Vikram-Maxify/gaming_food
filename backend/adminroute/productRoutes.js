const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const admin = require("../middleware/adminMiddleware");

const { createProduct } = require("../controllers/productController");
const protect = require("../middleware/authmiddleware");

// 🔐 Only admin can create product
router.post("/create", protect, admin, upload.single("image"), createProduct);

module.exports = router;