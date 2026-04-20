const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const uploadToImageBB = require("../utils/uploadToImageBB");

const createProduct = async (req, res) => {
  try {
    const { name, category, creditPoints } = req.body;

    // validation
    if (!name || !category || !creditPoints || !req.file) {
      return res.status(400).json({
        message: "All fields required (name, category, creditPoints, image)",
      });
    }

    // check category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid category" });
    }

    // upload image
    const imageUrl = await uploadToImageBB(req.file);

    // create product
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

module.exports = { createProduct };