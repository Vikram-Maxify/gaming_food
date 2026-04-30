const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const uploadToImageBB = require("../utils/uploadToImageBB");
const slugify = require("slugify");

// ===============================
// ➕ CREATE PRODUCT (SLUG BASED)
// ===============================
const createProduct = async (req, res) => {
  try {
    const { name, category, type, creditPoints, variants } = req.body;

    if (!name || !category || !type || !creditPoints || !req.file) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const parsedVariants = JSON.parse(variants);

    // ✅ FIND CATEGORY BY SLUG
    const categoryExists = await Category.findOne({ slug: category });

    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid category slug" });
    }

    const imageUrl = await uploadToImageBB(req.file);

    const slug = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });

    const product = await Product.create({
      name,
      slug,
      image: imageUrl,
      category: categoryExists._id, // ✅ store ObjectId
      type,
      creditPoints,
      variants: parsedVariants,
    });

    res.status(201).json({
      message: "Product created",
      product: {
        ...product._doc,
        category: categoryExists.slug, // ✅ return slug
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// 📦 GET ALL PRODUCTS
// ===============================
const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name slug")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: products.length,
      products: products.map((p) => ({
        ...p._doc,
        category: p.category.slug, // ✅ slug return
      })),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// 🔍 GET SINGLE PRODUCT
// ===============================
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name slug");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      ...product._doc,
      category: product.category.slug,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// ✏️ UPDATE PRODUCT
// ===============================
const updateProduct = async (req, res) => {
  try {
    const { name, category, type, creditPoints, variants } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (name) {
      product.name = name;
      product.slug = slugify(name, { lower: true, strict: true });
    }

    if (type) product.type = type;
    if (creditPoints !== undefined) product.creditPoints = creditPoints;

    // ✅ UPDATE CATEGORY VIA SLUG
    if (category) {
      const categoryExists = await Category.findOne({ slug: category });

      if (!categoryExists) {
        return res.status(400).json({ message: "Invalid category slug" });
      }

      product.category = categoryExists._id;
    }

    if (variants) {
      product.variants = JSON.parse(variants);
    }

    if (req.file) {
      product.image = await uploadToImageBB(req.file);
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

// ===============================
// ❌ DELETE PRODUCT
// ===============================
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};