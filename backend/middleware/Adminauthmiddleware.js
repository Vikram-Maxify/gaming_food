const jwt = require("jsonwebtoken");
const Admin = require("../models/authModels");

const protectAdmin = async (req, res, next) => {
  const token = req.cookies.adminToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No admin token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    req.user = admin;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid admin token" });
  }
};

module.exports = protectAdmin;