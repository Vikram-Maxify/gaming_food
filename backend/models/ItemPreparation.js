const mongoose = require("mongoose");

const itemPreparationSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true, // order.items._id
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    // 👨‍🍳 Chef info
    chefId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chef",
      required: true,
    },

    chefName: {
      type: String,
      required: true,
    },

    // 📌 status (future use)
    status: {
      type: String,
      enum: ["preparing", "ready"],
      default: "ready",
    },

    readyAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ItemPreparation", itemPreparationSchema);