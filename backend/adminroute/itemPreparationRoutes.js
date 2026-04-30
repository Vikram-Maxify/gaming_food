const express = require("express");
const router = express.Router();

const {
  markItemReady,
  getAllPreparations,
} = require("../admincontroller/itemPreparationController");

const chefOnly = require("../middleware/chefOnly");

// 👨‍🍳 mark item ready
router.post("/ready", chefOnly, markItemReady);

// 📊 get all tracking
router.get("/",chefOnly, getAllPreparations);

module.exports = router;