const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const uploadToImageBB = require("../utils/uploadToImageBB");
const slugify = require("slugify");

const createProduct = async (req, res) => {
  try {
    const { name, category, type, creditPoints, variants } = req.body;

    if (!name || !category || !type || !creditPoints || !req.file) {
      return res.status(400).json({
        message: "All fields required (name, category, type, creditPoints, image)",
      });
    }

    if (!variants) {
      return res.status(400).json({
        message: "Variants are required",
      });
    }

    let parsedVariants;

    try {
      parsedVariants = JSON.parse(variants);
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

    // ⭐ CREATE SLUG
    const slug = slugify(name, {
      lower: true,      // lowercase
      strict: true,     // remove special chars
      trim: true,
    });

    const product = await Product.create({
      name,
      slug, // 👈 add here
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
    const { name, category, type, creditPoints, variants, isPopular } = req.body;

    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ✅ Basic fields
    if (name) product.name = name;
    if (type) product.type = type;
    if (creditPoints !== undefined) product.creditPoints = creditPoints;

    // ⭐ NEW: update isPopular
    if (isPopular !== undefined) {
      product.isPopular = isPopular;
    }

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