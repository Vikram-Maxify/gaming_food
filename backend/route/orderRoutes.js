const express = require("express");
const { selectTable, createOrder, getMyOrders } = require("../controllers/orderController");
const protect = require("../middleware/authmiddleware");
const router = express.Router();





// 👤 User
router.post("/select-table", protect, selectTable);
router.post("/create", protect, createOrder);
router.get("/my", protect, getMyOrders);

// 👑 Admin

module.exports = router;