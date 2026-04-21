const express = require("express");
const { register, login, logout, getUser, verifyRegisterOTP } = require("../controllers/authController");
const protect = require("../middleware/authmiddleware");
const router = express.Router()


router.post("/register",register)
router.post("/verify-otp", verifyRegisterOTP);
router.post("/login",login)
router.get("/user",protect,getUser)
router.get("/logout",logout)



module.exports = router