const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
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
    gender: {
        enum: ["Male", "Female", "Other"],
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    nationality: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    profilePic: {
        type: Object,
        default: null,
    }
})

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };