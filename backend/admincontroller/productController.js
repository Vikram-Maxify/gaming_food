const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const uploadToImageBB = require("../utils/uploadToImageBB");


// ✅ CREATE (your existing)
const createProduct = async (req, res) => {
  try {
    const { name, category, type, creditPoints, variants } = req.body;

    // 🔍 validate basic fields
    if (!name || !category || !type || !creditPoints || !req.file) {
      return res.status(400).json({
        message: "All fields required (name, category, type, creditPoints, image)",
      });
    }

    // 🔍 validate variants
    if (!variants) {
      return res.status(400).json({
        message: "Variants are required",
      });
    }

    let parsedVariants;

    try {
      parsedVariants = JSON.parse(variants); // ⚠️ frontend se string aata hai
    } catch (err) {
      return res.status(400).json({ message: "Invalid variants format" });
    }

    if (!Array.isArray(parsedVariants) || parsedVariants.length === 0) {
      return res.status(400).json({
        message: "At least one variant required",
      });
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const imageUrl = await uploadToImageBB(req.file);

    const product = await Product.create({
      name,
      image: imageUrl,
      category,
      type,
      creditPoints,
      variants: parsedVariants,
    });

    res.status(201).json({
      message: "Product created",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



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



// ✅ UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const { name, category, type, creditPoints, variants } = req.body;

    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (name) product.name = name;
    if (type) product.type = type;
    if (creditPoints) product.creditPoints = creditPoints;

    // ✅ update variants
    if (variants) {
      try {
        const parsedVariants = JSON.parse(variants);
        product.variants = parsedVariants;
      } catch (err) {
        return res.status(400).json({ message: "Invalid variants format" });
      }
    }

    // ✅ category update
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ message: "Invalid category" });
      }
      product.category = category;
    }

    // ✅ image update
    if (req.file) {
      const imageUrl = await uploadToImageBB(req.file);
      product.image = imageUrl;
    }

    await product.save();

    res.status(200).json({
      message: "Product updated",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ✅ DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.status(200).json({
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ✅ EXPORT
module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};