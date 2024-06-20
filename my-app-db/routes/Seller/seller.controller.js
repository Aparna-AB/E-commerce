const { SellerModel } = require("./seller.model");
const mongoose = require("mongoose");

// payload is a data that we store inside jwt
function generateAccessToken(payload) {
    return jwt.sign(payload, "1234ABCD");
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
        const newSeller = new SellerModel({
            name,
            age,
            address,
            phoneNumber,
            email,
            password,
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
        if (password !== seller.password) {
            return res.status(404).json({ message: "Couldn't find the user" });
        }

        //jwt used here to generate access token
        // const copySeller = { ...seller };
        // console.log("before copy seller", copySeller);
        // delete copySeller.password;
        // console.log("copy seller", copySeller);
        // const accessToken = generateAccessToken(copySeller);

        return res.status(200).json({ message: "Login Successfully", data: seller });
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
        const seller = await SellerModel.findById({ id });
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