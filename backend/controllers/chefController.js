const Auth = require("../models/authModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// 🔐 CHEF LOGIN
const chefLogin = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
      return res.status(400).json({
        success: false,
        message: "Mobile and password required",
      });
    }

    const user = await Auth.findOne({ mobile });

    // ❌ user check
    if (!user || user.role !== "chef") {
      return res.status(400).json({
        success: false,
        message: "Chef not found",
      });
    }

    // 🔐 bcrypt compare DIRECT IN CONTROLLER
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // 🔑 token generate
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🍪 cookie set
    res.cookie("chefToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Chef login successful",
      chef: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        role: user.role,
      },
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
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