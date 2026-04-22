const orderModel = require("../models/orderModel");

// 🔥 UPDATE STATUS (REAL-TIME)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await orderModel
      .findById(req.params.id)
      .populate("user");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    const io = req.app.get("io");

    // ✅ Send FULL ORDER to USER
    io.to(order.user._id.toString()).emit("orderStatusUpdated", order);

    // ✅ Send to ADMIN dashboard
    io.to("adminRoom").emit("adminOrderUpdated", order);

    res.json({
      message: "Status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📦 GET ALL ORDERS
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("user", "name")
      .populate("items.product", "name",)
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updateOrderStatus,
  getAllOrders,
};