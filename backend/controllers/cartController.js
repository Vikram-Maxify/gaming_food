const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// 🛒 ADD TO CART
const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, variantId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const variant = product.variants.id(variantId);
    if (!variant) return res.status(404).json({ message: "Variant not found" });

    const price = variant.discountPrice || variant.price;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.variantId.toString() === variantId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: product._id,
        variantId: variant._id,
        name: product.name,
        variantName: variant.name,
        price,
        quantity,
        image: product.image,
      });
    }

    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    res.json({ cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ❌ REMOVE FROM CART
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, variantId } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // 🔥 remove item
    cart.items = cart.items.filter(
      (item) =>
        !(
          item.product.toString() === productId &&
          item.variantId.toString() === variantId
        )
    );

    // 🔢 recalc total
    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    res.json({ cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔄 UPDATE QUANTITY
const updateQuantity = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, variantId, quantity, spiceLevel } = req.body; // ✅ add spice

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.variantId.toString() === variantId
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // ✅ UPDATE QUANTITY
    if (quantity !== undefined) {
      item.quantity = quantity;
    }

    // 🔥 FIX: UPDATE SPICE LEVEL
    if (spiceLevel) {
      item.spiceLevel = spiceLevel;
    }

    // 🔢 recalc total
    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    // 🔥 IMPORTANT: return updated item data
    res.json({
      productId,
      variantId,
      quantity: item.quantity,
      spiceLevel: item.spiceLevel, // ✅ THIS FIXES YOUR ISSUE
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📦 GET CART
const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.json({ cart: { items: [], totalAmount: 0 } });
    }

    res.json({ cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  updateQuantity,
  getCart,
};