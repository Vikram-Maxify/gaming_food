const express = require("express");
const router = express.Router();

const {
  markItemReady,
  getAllPreparations,
  getdatabyid,
} = require("../admincontroller/itemPreparationController");

const chefOnly = require("../middleware/chefOnly");

// 👨‍🍳 mark item ready
router.post("/ready", chefOnly, markItemReady);

router.get("/getdatabyid",chefOnly,getdatabyid)

// 📊 get all tracking
router.get("/",chefOnly, getAllPreparations);

module.exports = router;