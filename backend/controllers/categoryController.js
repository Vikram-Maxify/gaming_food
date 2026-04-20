const Category = require("../models/categoryModel");

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


module.exports = {
  getCategories,
  getCategoryById,
};  