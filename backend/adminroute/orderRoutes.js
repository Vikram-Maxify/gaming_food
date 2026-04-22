const express = require("express");
const router = express.Router();

const protect = require("../middleware/authmiddleware");
const admin = require("../middleware/adminMiddleware");
const { getAllOrders, updateOrderStatus } = require("../admincontroller/orderController");
const protectAdmin = require("../middleware/Adminauthmiddleware");




router.get("/all", protectAdmin, admin, getAllOrders);
router.put("/status/:id", protectAdmin, admin, updateOrderStatus);

module.exports = router;