const chefOnly = (req, res, next) => {
  try {
    // protect middleware already req.user set karta hai
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== "chef") {
      return res.status(403).json({ message: "Access denied - Chef only" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = chefOnly;