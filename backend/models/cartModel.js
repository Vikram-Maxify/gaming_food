const mongoose = require("mongoose");

// 🛒 Cart Item
const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  variantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  name: String,
  variantName: String,
  price: Number,
  image: String,

  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
});

// 🧾 Cart
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
     ref: "Auth",
      unique: true,
      required: true,
    },

    items: [cartItemSchema],

    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);