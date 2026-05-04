const Favorite = require("../models/favoriteModel");


// ✅ Toggle Favorite (Add / Remove same API)
exports.toggleFavorite = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    const existing = await Favorite.findOne({
      user: userId,
      product: productId,
    });

    if (existing) {
      await existing.deleteOne();
      return res.json({
        success: true,
        message: "Removed from favorites",
      });
    }

    const favorite = await Favorite.create({
      user: userId,
      product: productId,
    });

    res.json({
      success: true,
      message: "Added to favorites",
      favorite,
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};



// ✅ Get all favorites of user
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({
      user: req.user._id,
    }).populate("product");

    res.json({
      success: true,
      favorites,
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};