const Auth = require("../models/Chefmodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



const chefRegister = async (req, res) => {
  try {
    const { name, mobile, password, category } = req.body;

    // ✅ validation
    if (!name || !mobile || !password || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 🔎 check existing user
    const existing = await Auth.findOne({ mobile });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Mobile already registered",
      });
    }

    // 🔐 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ create chef
    const chef = await Auth.create({
      name,
      mobile,
      password: hashedPassword,
      plainPassword: password, // ⚠️ admin view (optional)
      category,
      role: "chef",
      credit: 0,
    });

    return res.status(201).json({
      success: true,
      message: "Chef registered successfully",
      chef: {
        id: chef._id,
        name: chef.name,
        mobile: chef.mobile,
        role: chef.role,
        category: chef.category,
        credit: chef.credit,
        plainPassword: chef.plainPassword, // 👀 send to admin if needed
      },
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
};



const getchef = async (req, res) => {
  try {
    const chef = await Auth.find();
    res.status(200).json(chef);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





const chefdelet = async (req, res) => {
  try {
    const chef = await Auth.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      chef
    });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};




module.exports = {
  chefRegister,
  getchef,
  chefdelet,

}