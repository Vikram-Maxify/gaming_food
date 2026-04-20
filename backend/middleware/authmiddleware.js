
const protect = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        decode = jwt.decode(token);
        req.user = decode;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
  };
  
  module.exports = protect;