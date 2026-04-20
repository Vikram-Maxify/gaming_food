const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No token" });
  }

  try {
    // ✅ VERIFY token (not decode)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // contains user id or payload
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

module.exports = protect;