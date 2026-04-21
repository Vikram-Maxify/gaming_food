const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { updateSettings, getSettings } = require("../admincontroller/adminSettingsController");



// multer config

router.post("/settings", upload.single("logo"), updateSettings);
router.get("/settings", getSettings);

module.exports = router;