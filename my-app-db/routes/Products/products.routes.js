const express=require("express");
const productRoutes=express.Router();
const {createProduct,allProducts,prdctId} =require("./products.controller.js");

productRoutes.post("/addProduct",createProduct);
productRoutes.get("/viewProducts",allProducts);
productRoutes.get("/:prdctId",prdctId);

module.exports= {productRoutes};