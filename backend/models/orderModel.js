const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },

    tableNumber: {
      type: String,
      required: true,
    },

    // 🥡 Takeaway Order
    takeaway: {
      type: Boolean,
      default: false,
    },

items: [
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    productName: String, 

    image: String,

    variantName: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    creditPoints: Number,

    spiceLevel: {
      type: String,
      enum: ["low", "medium", "high", "extra-high"],
      default: "medium",
    },
  },
],

    totalCredits: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "preparing", "ready", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);