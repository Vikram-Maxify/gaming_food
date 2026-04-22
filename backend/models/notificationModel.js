const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: String,
    message: String,

    type: {
      type: String,
      enum: ["info", "warning", "success", "offer"],
      default: "info",
    },

    isGlobal: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },

    expiresAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);