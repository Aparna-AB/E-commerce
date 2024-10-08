const mongoose = require('mongoose');
//Destructure the schema object
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: "active",

    },
    description: {
        type: String,
        required: true,

    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    sellerId: {
        type: mongoose.Types.ObjectId,
        ref: "seller",
        required: true
    },
    expDate: {
        type: String,
        default: Date.now()
    },
    // productImg:{
    //     type:Object,
    //     default:null,
    // }
})
const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };

//available qnty
//total qnty


//seller
//name,email,pw,address,category,isAdminApproved(default -false),submit
