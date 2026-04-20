const mongoose = require("mongoose");

const carGameSchema = new mongoose.Schema(
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
        progress: {
          type: Number,
          default: 0,
        },
      },
    ],

    status: {
      type: String,
      enum: ["waiting", "playing", "finished"],
      default: "waiting",
    },

    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    pot: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CarGame", carGameSchema);