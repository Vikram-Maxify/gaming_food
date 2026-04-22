const User = require("../models/authModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { recompileSchema } = require("../models/gameModel");
const generateToken = require("../utils/generatetoken");



// ✅ ADMIN REGISTER (optional)
const registerAdmin = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      role: "admin", // 👑 force admin
    });

    res.status(201).json({
      message: "Admin registered",
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ✅ ADMIN LOGIN
const loginAdmin = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    const admin = await User.findOne({ mobile });

    if (!admin || admin.role !== "admin") {
      return res.status(401).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const adminToken = generateToken(admin._id ,admin.role);

    // 🍪 send cookie
    res.cookie("adminToken", adminToken, {
      httpOnly: true,
      secure: false, // true in production (https)
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Admin login successful",
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
      token, // optional (if using frontend storage)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ✅ GET ADMIN PROFILE
const getAdminProfile = async (req, res) => {
  try {
    const admin = await User.findById(req.user.id).select("-password");
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ LOGOUT
const logoutAdmin = async (req, res) => {
  try {
    res.cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  logoutAdmin,
};