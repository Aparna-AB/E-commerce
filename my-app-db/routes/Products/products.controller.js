const { ProductModel } = require("./products.model");

//Add products
const createProduct = async (req, res) => {
  try {
    const { name, title, description, quantity, price, expDate, sellerId } =
      req.body;
    if (
      !name ||
      !title ||
      !description ||
      !quantity ||
      !price ||
      !expDate ||
      !sellerId
    ) {
      return res.status(400).json({ message: "fill all fields" });
    }
    const newProduct = new ProductModel({
      name,
      title,
      description,
      quantity,
      price,
      expDate,
      sellerId,
    });
    await newProduct.save();
    return res
      .status(200)
      .json({ message: "New product added succefully", data: newProduct });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

//view all products

const allProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    return res.status(200).json({
      message: "list of all products fetched successfully",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

//view product by Id:-

const prdctId = async (req, res) => {
  try {
    const id = req.params.prdctId;
    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    return res
      .status(200)
      .json({ message: "this product is there in the db", data: product });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

const getProductsBySellerId = async (req, res) => {
  try {
    const sellerId = req.params.id;
    const products = await ProductModel.find({ sellerId: sellerId })
      .populate("sellerId")
      .exec();

    return res
      .status(200)
      .json({ message: "All products by seller id", data: products });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};

module.exports = { createProduct, allProducts, prdctId, getProductsBySellerId };
