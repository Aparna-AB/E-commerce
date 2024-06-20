const mongoose = require("mongoose");
const { Schema } = mongoose;

const sellerSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const SellerModel = mongoose.model("seller", sellerSchema);
module.exports = { SellerModel };
