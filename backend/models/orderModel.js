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

        quantity: {
          type: Number,
          default: 1,
        },

        creditPoints: Number,

        // 🌶️ Spice Level per item
        spiceLevel: {
          type: String,
          enum: ["low", "medium", "high"],
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
      enum: ["pending", "preparing", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);