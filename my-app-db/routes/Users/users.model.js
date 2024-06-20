const mongoose=require('mongoose');

const {Schema}=mongoose;

const userSchema= new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    gender: String,
    age: Number,
    phoneNumber: Number,
    street: String,
    city: String,
    state: String,
    nationality: String,
    pincode: Number,
    // img: null,
})

const userModel= mongoose.model("User",userSchema);

module.exports={userModel};