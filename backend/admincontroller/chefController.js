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

const updateChefByAdmin = async (req, res) => {
  try {
    const chefId = req.params.id;
    const updates = req.body;

    // ❌ fields that should NOT be updated directly
    const restrictedFields = ["password", "role", "_id"];

    // 🔍 remove restricted fields
    restrictedFields.forEach((field) => {
      if (updates[field]) delete updates[field];
    });

    // 🔄 optional: handle credit increment
    if (updates.credit !== undefined && typeof updates.credit === "number") {
      updates.$inc = { credit: updates.credit };
      delete updates.credit;
    }

    const chef = await Auth.findByIdAndUpdate(
      chefId,
      updates,
      { returnDocument: "after", runValidators: true }
    );

    if (!chef) {
      return res.status(404).json({
        success: false,
        message: "Chef not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Chef updated successfully",
      chef,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



module.exports = {
  chefRegister,
  getchef,
  chefdelet,
  updateChefByAdmin


}