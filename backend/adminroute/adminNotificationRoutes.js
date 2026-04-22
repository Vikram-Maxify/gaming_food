const express = require("express");
const router = express.Router();

const {
  createNotification,
  updateNotification,
  deleteNotification,
  getAllNotifications,
} = require("../admincontroller/adminNotificationController");
const protectAdmin = require("../middleware/Adminauthmiddleware");
const admin = require("../middleware/adminMiddleware");


router.use(protectAdmin, admin);

router.post("/create", createNotification);
router.put("/:id", updateNotification);
router.delete("/:id", deleteNotification);
router.get("/", getAllNotifications);

module.exports = router;