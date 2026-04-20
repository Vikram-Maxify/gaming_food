const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const admin = require("../middleware/adminMiddleware");

const protect = require("../middleware/authmiddleware");
const { createProduct } = require("../admincontroller/productController");

// 🔐 Only admin can create product
router.post("/create", protect, admin, upload.single("image"), createProduct);

module.exports = router;