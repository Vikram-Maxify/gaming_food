const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const uploadToImageBB = require("../utils/uploadToImageBB");


// ✅ CREATE (your existing)
const createProduct = async (req, res) => {
  try {
    const { name, category, type, price, creditPoints } = req.body;

    if (!name || !category || !creditPoints || !req.file) {
      return res.status(400).json({
        message: "All fields required (name, category, creditPoints, image)",
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
      creditPoints,
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
    const { name, category, creditPoints } = req.body;

    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // update fields if provided
    if (name) product.name = name;
    if (creditPoints) product.creditPoints = creditPoints;

    // check & update category
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ message: "Invalid category" });
      }
      product.category = category;
    }

    // update image if new file
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