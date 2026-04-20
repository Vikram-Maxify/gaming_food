const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
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
        },
        symbol: {
          type: String, // "X" or "O"
        },
      },
    ],

    board: {
      type: [String], // ["X", "", "O", ...]
      default: ["", "", "", "", "", "", "", "", ""],
    },

    turn: {
      type: String, // "X" or "O"
      default: "X",
    },

    winner: {
      type: String, // "X", "O", "draw"
      default: null,
    },

    status: {
      type: String,
      enum: ["waiting", "playing", "finished"],
      default: "waiting",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);