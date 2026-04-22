const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const admin = require("../middleware/adminMiddleware");

const protect = require("../middleware/authmiddleware");
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require("../admincontroller/productController");
const protectAdmin = require("../middleware/Adminauthmiddleware");

// 🔐 Only admin can create product
router.get("/", getProducts);
router.get("/:id", getProductById);

// 🔐 Admin
router.post("/create", protectAdmin, admin, upload.single("image"), createProduct);
router.put("/update/:id", protectAdmin, admin, upload.single("image"), updateProduct);
router.delete("/delete/:id", protectAdmin, admin, deleteProduct);
module.exports = router;