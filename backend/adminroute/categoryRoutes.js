const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const { createCategory, updateCategory, deleteCategory, getCategories, getCategoryById } = require("../admincontroller/categoryController");
const protect = require("../middleware/authmiddleware");
const admin = require("../middleware/adminMiddleware");


// 🔐 Admin only
router.post("/create", protect, admin, upload.single("image"), createCategory);
router.put("/update/:id", protect, admin, upload.single("image"), updateCategory);
router.delete("/delete/:id", protect, admin, deleteCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);


module.exports = router;