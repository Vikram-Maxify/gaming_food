const mongoose = require("mongoose");

const ludoSchema = new mongoose.Schema(
  {
    // ✅ FIX: roomId → table (ObjectId)
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },

    players: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          default: null, // 🤖 allow computer
        },
        color: {
          type: String,
          enum: ["red", "blue"],
        },
      },
    ],

    board: {
      type: Object,
      default: {
        red: [0, 0, 0, 0],
        blue: [0, 0, 0, 0],
      },
    },

    turn: {
      type: String,
      enum: ["red", "blue"],
      default: "red",
    },

    dice: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["waiting", "playing", "finished"],
      default: "waiting",
    },

    winner: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LudoGame", ludoSchema);