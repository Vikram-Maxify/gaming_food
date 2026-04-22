const Notification = require("../models/notificationModel");
const NotificationRead = require("../models/notificationReadModel");

// ✅ Get my notifications
exports.getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      isGlobal: true,
    }).sort({ createdAt: -1 });

    const read = await NotificationRead.find({
      user: req.user._id,
    });

    const readMap = {};
    read.forEach((r) => {
      readMap[r.notification] = true;
    });

    const result = notifications.map((n) => ({
      ...n._doc,
      isRead: readMap[n._id] || false,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Mark as read
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    await NotificationRead.findOneAndUpdate(
      {
        user: req.user._id,
        notification: id,
      },
      { isRead: true },
      { upsert: true }
    );

    res.json({ message: "Marked as read" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Unread count (🔥 important for bell icon)
exports.getUnreadCount = async (req, res) => {
  try {
    const total = await Notification.countDocuments({ isGlobal: true });

    const read = await NotificationRead.countDocuments({
      user: req.user._id,
    });

    const unread = total - read;

    res.json({ unread });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};