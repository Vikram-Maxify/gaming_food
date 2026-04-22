const Order = require("../models/orderModel");
const User = require("../models/authModels");
const Product = require("../models/productModel");
const Table = require("../models/tableModel");
const Cart = require("../models/cartModel");


// ✅ Select Table
const selectTable = async (req, res) => {
  try {
    const { tableNumber } = req.body;

    if (!tableNumber) {
      return res.status(400).json({ message: "Table number required" });
    }

    const user = await User.findById(req.user._id);

    // ✅ STEP 1: User already has table
    if (user.tableNumber) {
      return res.status(200).json({
        message: "Table already assigned to you",
        tableNumber: user.tableNumber, // 🔥 IMPORTANT
      });
    }

    // ✅ STEP 2: Check table exists
    const table = await Table.findOne({ tableNumber });
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    // ✅ STEP 3: Check occupied
    if (table.isOccupied) {
      return res.status(400).json({
        message: "Table already occupied",
        tableNumber: tableNumber, // 🔥 optional but useful for UI
      });
    }

    // ✅ STEP 4: Assign table
    user.tableNumber = tableNumber;
    await user.save();

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

    res.status(200).json({
      message: "Table selected successfully",
      tableNumber: tableNumber, // 🔥 ALWAYS SEND
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Create Order
const createOrder = async (req, res) => {
  try {
    const { items, takeaway } = req.body;

    console.log(items);


    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items" });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

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
      const spiceLevel = item.spiceLevel || "medium";

      let finalPrice = 0;
      let variantName = null;

      // ✅ Variant logic
      if (product.variants && product.variants.length > 0) {
        const variant = product.variants.find(
          (v) => v.name === item.variantName
        );

        if (variant) {
          finalPrice = variant.discountPrice || variant.price;
          variantName = variant.name;
        } else {
          const firstVariant = product.variants[0];
          finalPrice =
            firstVariant.discountPrice || firstVariant.price;
          variantName = firstVariant.name;
        }
      } else {
        finalPrice = product.price || 0;
      }

      const credits = product.creditPoints * quantity;
      totalCredits += credits;

      orderItems.push({
        product: product._id,
        variantName,
        price: finalPrice,
        quantity,
        creditPoints: product.creditPoints,
        spiceLevel,
      });
    }

    // ✅ Add credits to user
    user.credit += totalCredits;
    await user.save();

    // ✅ Create order
    const order = await Order.create({
      user: user._id,
      tableNumber: takeaway ? "TAKEAWAY" : user.tableNumber,
      takeaway: takeaway || false,
      items: orderItems,
      totalCredits,
      status: "pending",
    });

    // ✅ Table update (only dine-in)
    if (!takeaway) {
      const table = await Table.findOne({ tableNumber: user.tableNumber });

      if (table) {
        table.isOccupied = true;
        table.currentOrder = order._id;
        await table.save();
      }
    }

    // ✅ CART CLEAR (IMPORTANT FIX)
    await Cart.findOneAndDelete({ user: user._id });

    // ✅ Populate order
    const populatedOrder = await Order.findById(order._id)
      .populate("items.product", "name image")
      .populate("user", "name");

    // ✅ Socket event
    const io = req.app.get("io");
    if (io) {
      io.to("adminRoom").emit("newOrder", populatedOrder);
    }

    res.status(201).json({
      message: "Order placed successfully",
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