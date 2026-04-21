const Table = require('../models/tableModel')



const getTables = async (req, res) => {
  const tables = await Table.find().sort({ createdAt: 1 });

  res.json({
    count: tables.length,
    tables,
  });
};

module.exports = {
  getTables,
};