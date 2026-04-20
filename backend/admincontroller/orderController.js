const orderModel = require("../models/orderModel");

const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  const order = await orderModel.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.status = status;
  await order.save();

  res.json({ message: "Status updated", order });
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name")
    .populate("items.product", "name")
    .sort({ createdAt: -1 });

  res.json(orders);
};

module.exports = {
  updateOrderStatus,
  getAllOrders,
};