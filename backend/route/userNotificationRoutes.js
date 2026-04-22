const express = require("express");
const router = express.Router();

const {
  getMyNotifications,
  markAsRead,
  getUnreadCount,
} = require("../controllers/userNotificationController");
const protect = require("../middleware/authmiddleware");


router.use(protect);

router.get("/", getMyNotifications);
router.get("/unread", getUnreadCount);
router.put("/read/:id", markAsRead);

module.exports = router;