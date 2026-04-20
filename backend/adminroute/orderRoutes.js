const express = require("express");
const router = express.Router();

const protect = require("../middleware/authmiddleware");
const admin = require("../middleware/adminMiddleware");
const { getAllOrders, updateOrderStatus } = require("../admincontroller/orderController");




router.get("/all", protect, admin, getAllOrders);
router.put("/status/:id", protect, admin, updateOrderStatus);

module.exports = router;