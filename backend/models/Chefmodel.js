const mongoose = require("mongoose");

const chefSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    password: {
      type: String,
      required: true, // 🔐 hashed value will be stored
    },
    role: {
      type: String,
      enum: ["admin", "chef"],
      default: "chef",
    },
    plainPassword: {
      type: String, // 👀 admin can see
    },
    
    credit: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chef", chefSchema);