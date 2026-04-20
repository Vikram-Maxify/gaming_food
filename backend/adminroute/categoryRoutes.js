const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const { createCategory } = require("../admincontroller/categoryController");
const protect = require("../middleware/authmiddleware");
const admin = require("../middleware/adminMiddleware");

router.post("/create", protect, admin, upload.single("image"),  createCategory);

module.exports = router;