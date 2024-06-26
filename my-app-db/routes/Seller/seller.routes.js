const { createSeller, sellerLogin, getSellerById, getAllSellerDetails } = require("./seller.controller");
const { authenticateToken } = require("../../middlewares/jwtAuthentication.js");

const sellerRoutes=require("express").Router();

sellerRoutes.post("/sellerSignUp",createSeller);
sellerRoutes.post("/sellerLogin",sellerLogin);
sellerRoutes.get("/:id",authenticateToken,getSellerById);
sellerRoutes.get("/allSeller",getAllSellerDetails);

module.exports={sellerRoutes};