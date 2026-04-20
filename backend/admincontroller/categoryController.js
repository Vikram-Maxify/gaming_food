const Category = require("../models/categoryModel");
const uploadToImageBB = require("../utils/uploadToImageBB");

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !req.file) {
      return res.status(400).json({ message: "Name and image required" });
    }

    // Upload image
    const imageUrl = await uploadToImageBB(req.file);

    // Save to DB
    const category = await Category.create({
      name,
      image: imageUrl,
    });

    res.status(201).json({
      message: "Category created",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createCategory };