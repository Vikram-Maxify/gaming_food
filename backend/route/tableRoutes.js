const express = require("express");
const protect = require("../middleware/authmiddleware");
const { getTables } = require("../controllers/tableController");
const router = express.Router();



router.get("/get-usertables", protect, getTables);

module.exports = router;