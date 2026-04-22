const Table = require("../models/tableModel");
const Auth = require("../models/authModels"); // ✅ import user model


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
  try {
    const tableId = req.params.id;

    const table = await Table.findById(tableId);

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    // Already free
    if (!table.isOccupied) {
      return res.status(400).json({
        message: "Table is already free",
      });
    }

    // ✅ Step 1: free table
    table.isOccupied = false;
    await table.save();

    // ✅ Step 2: remove table from user
    await Auth.updateMany(
      { tableNumber: table.tableNumber }, // ya table._id agar use kar rahe ho
      { $set: { tableNumber: null } }
    );

    res.json({
      message: "Table is now free and users unlinked",
      table,
    });

  } catch (error) {
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