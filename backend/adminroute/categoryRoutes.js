const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const { createCategory, updateCategory, deleteCategory, getCategories, getCategoryById } = require("../admincontroller/categoryController");
const protect = require("../middleware/authmiddleware");
const admin = require("../middleware/adminMiddleware");
const protectAdmin = require("../middleware/Adminauthmiddleware");


// 🔐 Admin only
router.post("/create", protectAdmin, admin, upload.single("image"), createCategory);
router.put("/update/:id", protectAdmin, admin, upload.single("image"), updateCategory);
router.delete("/delete/:id", protectAdmin, admin, deleteCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);


module.exports = router;