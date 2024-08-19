const mongoose = require('mongoose');
const { AdminModel } = require("./admin.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

// Function to generate JWT token
function generateAccessToken(payload) {
    console.log("checking token", TOKEN_SECRET_KEY);
    console.log("payload", payload);

    const token = jwt.sign({ data: payload }, TOKEN_SECRET_KEY);
    console.log("checking for tokens", token);
    return token;
}

// Admin signup
const adminSignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const adminEmailExist = await AdminModel.findOne({ email });
        if (adminEmailExist) {
            return res.status(400).json({ message: "Email exists" });
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log("hashed password", hashedPassword);

        const adminNew = new AdminModel({
            name,
            email,
            password: hashedPassword,
        });
        await adminNew.save();
        return res.status(200).json({ message: "Admin Sign Up successful", data: adminNew });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
};

// Admin Login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill the email and password fields" });
        }
        const admin = await AdminModel.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Your email or password is incorrect" });
        }
        const isPasswordMatch = await bcrypt.compare(password, admin.password);
        if (!isPasswordMatch) {
            return res.status(404).json({ message: "Email or password is incorrect." });
        }
        console.log("checking access Token for admin", admin);
        const accessToken = generateAccessToken(admin._id);

        return res.status(200).json({ message: "Admin login successful", data: admin, accessToken });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { adminSignUp, adminLogin };
