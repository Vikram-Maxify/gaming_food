const mongoose = require("mongoose");

const promoSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },

    discountType: {
      type: String,
      enum: ["flat", "percentage"],
      required: true,
    },

    discountValue: {
      type: Number,
      required: true,
    },

    minOrderAmount: {
      type: Number,
      default: 0,
    },

    maxDiscount: {
      type: Number, // useful for percentage
    },

    totalUsageLimit: {
      type: Number, // total kitni baar use ho sakta hai
      default: 0,
    },

    usedCount: {
      type: Number,
      default: 0,
    },

    perUserLimit: {
      type: Number,
      default: 1,
    },

    usedBy: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Auth",
        },
        count: {
          type: Number,
          default: 0,
        },
      },
    ],

    expiresAt: Date,

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Promo", promoSchema);