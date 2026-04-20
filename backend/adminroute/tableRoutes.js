const express = require("express");
const router = express.Router();

const protect = require("../middleware/authmiddleware");
const admin = require("../middleware/adminMiddleware");
const { createTable, deleteTable, getTables } = require("../admincontroller/tableController");


// 👑 Admin
router.post("/create", protect, admin, createTable);
router.delete("/delete/:id", protect, admin, deleteTable);

// 👤 User/Admin

router.get("/gettables", protect, getTables);


module.exports = router;