const Notification = require("../models/notificationModel");

// ✅ Create notification (GLOBAL)
exports.createNotification = async (req, res) => {
  try {
    const { title, message, type } = req.body;

    const notification = await Notification.create({
      title,
      message,
      type,
      createdBy: req.user._id,
      isGlobal: true,
    });

    res.status(201).json({
      message: "Notification created successfully",
      notification,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update notification
exports.updateNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete notification
exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    await Notification.findByIdAndDelete(id);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all notifications (admin view)
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({
      createdAt: -1,
    });

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};