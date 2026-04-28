const Table = require("../models/tableModel");
const User = require("../models/authModels");

const getTables = async (req, res) => {
  try {
    const tables = await Table.find().sort({ createdAt: 1 });

    // 👉 sab users jinke paas table hai
    const users = await User.find({ tableNumber: { $ne: null } });

    const updatedTables = tables.map((table) => {
      const tableObj = table.toObject();

      if (table.isOccupied) {
        // 👉 match user with table
        const user = users.find(
          (u) => u.tableNumber === table.tableNumber
        );

        if (user) {
          tableObj.occupiedBy = {
            name: user.name,
          };
        } else {
          tableObj.occupiedBy = null;
        }
      }

      return tableObj;
    });

    res.json({
      tables: updatedTables,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTables,
};