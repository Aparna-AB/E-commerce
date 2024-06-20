const { createSeller, sellerLogin, getSellerById, getAllSellerDetails } = require("./seller.controller");

const sellerRoutes=require("express").Router();

sellerRoutes.post("/sellerSignUp",createSeller);
sellerRoutes.post("/sellerLogin",sellerLogin);
sellerRoutes.get("/:id",getSellerById);
sellerRoutes.get("/allSeller",getAllSellerDetails);

module.exports={sellerRoutes};