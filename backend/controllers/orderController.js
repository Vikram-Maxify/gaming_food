const Order = require("../models/orderModel");
const User = require("../models/authModels");
const Product = require("../models/productModel");
const Table = require("../models/tableModel");

// ✅ Select Table
const selectTable = async (req, res) => {
  try {
    const { tableNumber } = req.body;

    if (!tableNumber) {
      return res.status(400).json({ message: "Table number required" });
    }

    const user = await User.findById(req.user._id);

    // ✅ Check table exists
    const table = await Table.findOne({ tableNumber });
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    // ✅ NEW LOGIC
    if (table.isOccupied) {
      // 👉 Agar same user ki table hai → allow
      if (user.tableNumber === tableNumber) {
        return res.json({
          message: "Table already selected by you",
          tableNumber,
        });
      }

      // 👉 Kisi aur ki hai → block
      return res.status(400).json({
        message: "Table already occupied",
      });
    }

    // ✅ Assign table to user
    user.tableNumber = tableNumber;
    await user.save();

    // ✅ Update table status
    table.isOccupied = true;
    await table.save();

    // 🔥 SOCKET
    const io = req.app.get("io");
    if (io) {
      io.to("adminRoom").emit("tableSelected", {
        userId: user._id,
        tableNumber,
      });
    }

    res.json({ message: "Table selected", tableNumber });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Create Order
const createOrder = async (req, res) => {
  try {
    const { items, takeaway } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items" });
    }

    const user = await User.findById(req.user._id);

    // ❌ Table required only for dine-in
    if (!takeaway && !user.tableNumber) {
      return res.status(400).json({
        message: "Please select table first",
      });
    }

    let totalCredits = 0;
    let orderItems = [];

    for (let item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(400).json({ message: "Invalid product" });
      }

      const quantity = item.quantity || 1;
      const spiceLevel = item.spiceLevel || "medium"; // 🌶️ default

      const credits = product.creditPoints * quantity;
      totalCredits += credits;

      orderItems.push({
        product: product._id,
        quantity,
        creditPoints: product.creditPoints,
        spiceLevel, // ✅ added
      });
    }

    // ⚠️ spelling fix: credits (not credit)
    if (user.credits < totalCredits) {
      return res.status(400).json({
        message: "Not enough credits",
      });
    }

    user.credits -= totalCredits;
    await user.save();

    const order = await Order.create({
      user: user._id,
      tableNumber: takeaway ? "TAKEAWAY" : user.tableNumber,
      takeaway: takeaway || false, // ✅ added
      items: orderItems,
      totalCredits,
      status: "pending",
    });

    // 🔥 Table update only for dine-in
    if (!takeaway) {
      const table = await Table.findOne({ tableNumber: user.tableNumber });
      if (table) {
        table.isOccupied = true;
        table.currentOrder = order._id;
        await table.save();
      }
    }

    const populatedOrder = await Order.findById(order._id)
      .populate("items.product", "name image")
      .populate("user", "name");

    const io = req.app.get("io");
    if (io) {
      io.to("adminRoom").emit("newOrder", populatedOrder);
    }

    res.status(201).json({
      message: "Order placed",
      order: populatedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ My Orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product", "name image")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  selectTable,
  createOrder,
  getMyOrders,
};