const Order = require("../models/orderModel");
const User = require("../models/authModels");
const Product = require("../models/productModel");



const selectTable = async (req, res) => {
  try {
    const { tableNumber } = req.body;

    if (!tableNumber) {
      return res.status(400).json({ message: "Table number required" });
    }

    // ❗ check if table already occupied
    const existingOrder = await Order.findOne({
      tableNumber,
      status: { $in: ["pending", "preparing"] },
    });

    if (existingOrder) {
      return res.status(400).json({
        message: "Table already occupied",
      });
    }

    const user = await User.findById(req.user._id);

    user.tableNumber = tableNumber;
    await user.save();

    res.json({ message: "Table selected", tableNumber });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items" });
    }

    const user = await User.findById(req.user._id);

    // ❗ check table selected
    if (!user.tableNumber) {
      return res.status(400).json({
        message: "Please select table first",
      });
    }

    // ❗ double check table occupied
    const existingOrder = await Order.findOne({
      tableNumber: user.tableNumber,
      status: { $in: ["pending", "preparing"] },
    });

    if (existingOrder) {
      return res.status(400).json({
        message: "Table already occupied",
      });
    }

    let totalCredits = 0;
    let orderItems = [];

    for (let item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(400).json({ message: "Invalid product" });
      }

      const credits = product.creditPoints * item.quantity;
      totalCredits += credits;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        creditPoints: product.creditPoints,
      });
    }

    // ❗ check credits
    if (user.credits < totalCredits) {
      return res.status(400).json({
        message: "Not enough credits",
      });
    }

    // deduct credits
    user.credits -= totalCredits;
    await user.save();

    // create order
    const order = await Order.create({
      user: user._id,
      tableNumber: user.tableNumber,
      items: orderItems,
      totalCredits,
    });

    res.status(201).json({ message: "Order placed", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("items.product", "name image")
    .sort({ createdAt: -1 });

  res.json(orders);
};


module.exports = {
  selectTable,
  createOrder,
  getMyOrders,
};