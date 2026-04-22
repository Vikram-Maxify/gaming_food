const mongoose = require("mongoose");

const notificationReadSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },

    notification: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification",
      required: true,
    },

    isRead: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NotificationRead", notificationReadSchema);