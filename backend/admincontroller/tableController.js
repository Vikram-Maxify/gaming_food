const Table = require("../models/tableModel");
const Auth = require("../models/authModels");
const mongoose = require("mongoose");


const createTable = async (req, res) => {
  try {
    const { tableNumber } = req.body;

    if (!tableNumber) {
      return res.status(400).json({ message: "Table number required" });
    }

    const exists = await Table.findOne({ tableNumber });

    if (exists) {
      return res.status(400).json({ message: "Table already exists" });
    }

    const table = await Table.create({ tableNumber });

    res.status(201).json({
      message: "Table created",
      table,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const freeTable = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const tableId = req.params.id;

    const table = await Table.findById(tableId).session(session);

    if (!table) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Table not found" });
    }

    if (!table.isOccupied) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Table is already free",
      });
    }

    // ✅ Step 1: free table
    table.isOccupied = false;
    table.currentOrder = null; // 👉 important (agar use kar rahe ho)
    await table.save({ session });

    // ✅ Step 2: unlink users
    await Auth.updateMany(
      { tableNumber: table.tableNumber },
      { $set: { tableNumber: null } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.json({
      message: "Table freed successfully",
      table,
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

const deleteTable = async (req, res) => {
  const table = await Table.findById(req.params.id);

  if (!table) {
    return res.status(404).json({ message: "Table not found" });
  }

  if (table.isOccupied) {
    return res.status(400).json({
      message: "Cannot delete occupied table",
    });
  }

  await table.deleteOne();

  res.json({ message: "Table deleted" });
};
const getTables = async (req, res) => {
  const tables = await Table.find().sort({ createdAt: 1 });

  res.json({
    count: tables.length,
    tables,
  });
};

module.exports = {
  createTable,
  deleteTable,
  getTables,
  freeTable

};