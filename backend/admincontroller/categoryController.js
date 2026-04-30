const Category = require("../models/categoryModel");
const uploadToImageBB = require("../utils/uploadToImageBB");
const slugify = require("slugify");


// ✅ CREATE
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !req.file) {
      return res.status(400).json({
        message: "Name and image required",
      });
    }

    const imageUrl = await uploadToImageBB(req.file);

    const category = await Category.create({
      name,
      slug: slugify(name, { lower: true, strict: true }), // 🔥 added
      image: imageUrl,
    });

    res.status(201).json({
      message: "Category created",
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// ✅ GET ALL
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: categories.length,
      categories,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ GET SINGLE
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ UPDATE
const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;

    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // update name + slug
    if (name) {
      category.name = name;
      category.slug = slugify(name, { lower: true, strict: true }); // 🔥 added
    }

    // update image
    if (req.file) {
      const imageUrl = await uploadToImageBB(req.file);
      category.image = imageUrl;
    }

    await category.save();

    res.status(200).json({
      message: "Category updated",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ DELETE
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.deleteOne();

    res.status(200).json({
      message: "Category deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ EXPORT ALL
module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};