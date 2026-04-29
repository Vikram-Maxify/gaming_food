const jwt = require("jsonwebtoken");
const Auth = require("../models/authModels");

// 🔐 CHEF PROTECT MIDDLEWARE
const protectChef = async (req, res, next) => {
  try {
    const token = req.cookies.chefToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No chef token",
      });
    }

    // 🔑 verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 👨‍🍳 find chef user
    const chef = await Auth.findById(decoded.id).select("-password");

    if (!chef) {
      return res.status(401).json({
        success: false,
        message: "Chef not found",
      });
    }

    // ❌ role check (extra security)
    if (chef.role !== "chef") {
      return res.status(403).json({
        success: false,
        message: "Access denied - Not a chef",
      });
    }

    // 📦 attach user
    req.user = chef;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired chef token",
    });
  }
};

module.exports = protectChef;