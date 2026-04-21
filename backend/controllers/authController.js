const generateToken = require("../utils/generatetoken");
const TempUser = require("../models/tempUserModel");
const User = require("../models/authModels");
const bcrypt = require("bcryptjs");
const sendOTP = require("../utils/sendOTP");

const register = async (req, res) => {
    const { name, mobile, password } = req.body;

    try {
        // ❌ Already registered check
        const userExist = await User.findOne({ mobile });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 🔥 Delete old temp user (same mobile)
        await TempUser.deleteMany({ mobile });

        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const tempUser = await TempUser.create({
            name,
            mobile,
            password: hashedPassword,
            otp,
            otpExpire: Date.now() + 5 * 60 * 1000
        });

        // 📲 Send OTP
        await sendOTP(mobile, otp);

        res.json({
            message: "OTP sent",
            tempUserId: tempUser._id
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const verifyRegisterOTP = async (req, res) => {
    const { tempUserId, otp } = req.body;

    try {
        const tempUser = await TempUser.findById(tempUserId);

        if (!tempUser) {
            return res.status(400).json({ message: "Session expired" });
        }

        // ❌ OTP expire → delete temp user
        if (tempUser.otpExpire < Date.now()) {
            await TempUser.findByIdAndDelete(tempUserId);

            return res.status(400).json({
                message: "OTP expired, please register again"
            });
        }

        if (tempUser.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // ✅ Move to main User
        const user = await User.create({
            name: tempUser.name,
            mobile: tempUser.mobile,
            
            password: tempUser.password
        });


        const token = await generateToken(user._id, user.role);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
        })


        // 🧹 Delete temp user
        await TempUser.findByIdAndDelete(tempUserId);

        res.json({
            message: "Registration successful",
            user
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { mobile, password } = req.body;

    try {
        // ✅ Get password for comparison
        const user = await User.findOne({ mobile });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // ✅ Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // ✅ Generate token
        const token = await generateToken(user._id, user.role);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
        })

        const userData = user.toObject();
        delete userData.password;

        res.status(200).json({
            message: "Login successful",
            token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        console.log(req.user)
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    register,
    login,
    getUser,
    logout,
    verifyRegisterOTP
}


