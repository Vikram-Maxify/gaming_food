const multer = require("multer");

// ✅ memory storage (REQUIRED for ImageBB)
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // optional (5MB)
});

module.exports = upload;