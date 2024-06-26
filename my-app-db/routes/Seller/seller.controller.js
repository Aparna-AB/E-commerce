const { SellerModel } = require("./seller.model");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

//password bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;

// payload is a data that we store inside jwt
function generateAccessToken(payload) {
    console.log("checking token", TOKEN_SECRET_KEY);
    console.log("payload", payload);

    const token = jwt.sign({ data: payload }, TOKEN_SECRET_KEY);
    console.log("checking for tokens", token);
    return token;

}


//seller signUp-------------------------------------------------------------------
const createSeller = async (req, res) => {
    try {
        const { name, age, address, phoneNumber, email, password } = req.body;
        if (!name || !age || !address || !phoneNumber || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }
        const alreadyExistingEmail = await SellerModel.findOne({ email });
        if (alreadyExistingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newSeller = new SellerModel({
            name,
            age,
            address,
            phoneNumber,
            email,
            password: hashedPassword,
        });

        //save
        await newSeller.save();
        return res.status(200).json({ message: "New seller signed-up succesfully", data: newSeller });
    } catch (err) {
        return res.status(500).send({ messagr: err.message });
    }
};

//Seller-Login--------------------------------------------------------------------------------------------------------
const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill the valid email-id and password" });
        }
        const seller = await SellerModel.findOne({ email });
        if (!seller) {
            return res.status(400).json({ message: "Invalid Email" });
        }
        const isPasswordMatch=await bcrypt.compare(password,seller.password);
        if (!isPasswordMatch) {
            return res.status(404).json({ message: "Couldn't find the seller" });
        }
        console.log("checking access Token for seller", seller);

        //jwt used here to generate access token

        // const copySeller = { ...seller };
        // console.log("before copy seller", copySeller);
        // delete copySeller.password;
        // console.log("copy seller", copySeller);

        console.log("checking");
        const accessToken = generateAccessToken(seller._id);

        return res.status(200).json({ message: "Seller login successfully", data: seller, accessToken });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

//find seller-id--------------------------------------------------------------------------------------------

const getSellerById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send("All fields are required");
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("Invalid student id");
        }
        const seller = await SellerModel.findById(id);
        if (!seller) {
            return res.status(404).send("student not found");
        }
        return res.status(200).json({ message: "Student found", data: seller });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

//all seller details----------------------------------------------------------------------------------------------
const getAllSellerDetails = async (req, res) => {
    try {
        const allSeller = await SellerModel.find();
        if (allSeller.length === 0) {
            return res.status(404).send({ message: "No seller Found" });
        }
        return res.status(200).json({ message: "All seller data found", data: allSeller });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};






module.exports = { createSeller, sellerLogin, getSellerById, getAllSellerDetails };