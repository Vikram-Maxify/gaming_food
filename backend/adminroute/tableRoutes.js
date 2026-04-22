const express = require("express");
const router = express.Router();

const protect = require("../middleware/authmiddleware");
const admin = require("../middleware/adminMiddleware");
const { createTable, deleteTable, getTables } = require("../admincontroller/tableController");
const protectAdmin = require("../middleware/Adminauthmiddleware");


// 👑 Admin
router.post("/create", protectAdmin, admin, createTable);
router.delete("/delete/:id", protectAdmin, admin, deleteTable);

// 👤 User/Admin

router.get("/gettables", protectAdmin, getTables);


module.exports = router;