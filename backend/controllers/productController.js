const Product = require("../models/productModel");

// ✅ GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name") // 👈 show category name
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ✅ GET SINGLE PRODUCT
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ slug })
      .populate("category", "name"); // optional

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  getProducts,
  getProductById,
  getProductBySlug,

};