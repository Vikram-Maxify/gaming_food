const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const admin = require("../middleware/adminMiddleware");

const protect = require("../middleware/authmiddleware");
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require("../admincontroller/productController");

// 🔐 Only admin can create product
router.get("/", getProducts);
router.get("/:id", getProductById);

// 🔐 Admin
router.post("/create", protect, admin, upload.single("image"), createProduct);
router.put("/update/:id", protect, admin, upload.single("image"), updateProduct);
router.delete("/delete/:id", protect, admin, deleteProduct);
module.exports = router;