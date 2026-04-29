const Auth = require("../models/authModels");
const jwt = require("jsonwebtoken");


// 🔐 1. CHEF LOGIN
const chefLogin = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    const user = await Auth.findOne({ mobile });

    // ❌ check chef only
    if (!user || user.role !== "chef") {
      return res.status(400).json({ message: "Chef not found" });
    }

    // 🔐 password check
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 🔑 token create
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🍪 cookie name = chefToken
    res.cookie("chefToken", token, {
      httpOnly: true,
      secure: false
    });

    res.json({
      success: true,
      message: "Chef login successful"
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 👨‍🍳 2. CHEF PROFILE
const chefProfile = async (req, res) => {
  try {
    const chef = await Auth.findById(req.user._id).select("-password");

    res.json({
      success: true,
      chef
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 🚪 3. CHEF LOGOUT
const chefLogout = async (req, res) => {
  try {
    res.clearCookie("chefToken");

    res.json({
      success: true,
      message: "Chef logged out"
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  chefLogin,
  chefProfile,
  chefLogout
};