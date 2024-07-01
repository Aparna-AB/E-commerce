const express = require("express");
const productRoutes = express.Router();
const {
  createProduct,
  allProducts,
  prdctId,
  getProductsBySellerId,
} = require("./products.controller.js");

productRoutes.post("/addProduct", createProduct);
productRoutes.get("/viewProducts", allProducts);
productRoutes.get("/:id", prdctId);
productRoutes.get("/getProductsBySellerId/:id", getProductsBySellerId);

module.exports = { productRoutes };
