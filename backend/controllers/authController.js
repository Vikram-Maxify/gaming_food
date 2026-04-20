const User = require("../models/authModels");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generatetoken");


const register = async (req, res) => {

    const { name, mobile, password } = req.body;

    try {
        const userexit = await User.findOne({ mobile });

        if (userexit) {
            res.status(400).json({ message: "user already exist" })
        }

        const hasdedpassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            mobile,
            password: hasdedpassword
        })

        res.status(200).json({ user })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

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
        const token = await generateToken(user._id,user.role);

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
        const user = await User.findById(req.user.id);
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
    logout
}


