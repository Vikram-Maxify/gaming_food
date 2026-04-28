const mongoose = require("mongoose");

// 🍔 Variant Schema (Size-based)
const variantSchema = new mongoose.Schema({
  name: {
    type: String, // e.g. Small / Medium / Large
    required: true,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  discountPrice: {
    type: Number,
    validate: {
      validator: function (value) {
        return !value || value < this.price;
      },
      message: "Discount price must be less than price",
    },
  },

  stock: {
    type: Number,
    default: 0,
  },
});

// 🍕 Product Schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    // 📝 Description
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    // 🌶️ Spice Level
    spiceLevel: {
      type: String,
      enum: ["low", "medium", "high", "extra-high"],
      default: "medium",
    },

    // 🍃 Veg / Non-Veg
    type: {
      type: String,
      enum: ["veg", "non-veg", "sweets", "drinks", "snacks"],
      required: true,
    },

    variants: {
      type: [variantSchema],
      validate: [
        (val) => val.length > 0,
        "At least one variant is required",
      ],
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    creditPoints: {
      type: Number,
      required: true,
      min: 0,
    },

    isPopular: {
      type: Boolean,
      default: false,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);