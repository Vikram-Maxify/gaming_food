const express = require("express");
const router = express.Router();

const {
  chefRegister,
  getchef,
  chefLogin,
  chefProfile,
  chefLogout,
  chefdelet
} = require("../admincontroller/chefController");
const protect = require("../middleware/authmiddleware");
const chefOnly = require("../middleware/chefOnly");
const { getAllOrders, updateOrderStatus } = require("../admincontroller/orderController");


router.post("/register", chefRegister);
router.get("/getall", getchef);
router.delete("/delete/:id", chefdelet);

module.exports = router;