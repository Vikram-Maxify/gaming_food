const express = require("express");
const { getProducts, getProductById, getProductBySlug } = require("../controllers/productController");
const router = express.Router();


// 🔐 Only admin can create product
router.get("/", getProducts);
router.get("/product/:slug", getProductBySlug);
router.get("/:id", getProductById);



module.exports = router;