const express = require("express");
const router = express.Router();

const {
  chefLogin,
  chefProfile,
  chefLogout
} = require("../controllers/chefController");
const protect = require("../middleware/authmiddleware");
const chefOnly = require("../middleware/chefOnly");
const { getAllOrders, updateOrderStatus } = require("../admincontroller/orderController");



// 🔐 LOGIN
router.post("/login", chefLogin);


// 👨‍🍳 PROFILE
router.get("/profile",  chefOnly, chefProfile);

router.get("/order/all", chefOnly, getAllOrders);
router.put("/order/status/:id", chefOnly, updateOrderStatus)


// 🚪 LOGOUT
router.post("/logout",  chefOnly, chefLogout);


module.exports = router;