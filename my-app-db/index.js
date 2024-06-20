const express = require("express");
const cors=require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3080;
console.log(process.env.PORT)
app.use(express.json());
app.use(cors());

const { connectDB } = require("./connectDB.js");
const { userRoutes } = require("./routes/Users/users.routes.js");
const { productRoutes } = require("./routes/Products/products.routes.js");
const {sellerRoutes}=require("./routes/Seller/seller.routes.js");


app.get("/", (req, res) => {
    res.send("Home Page");
});

app.use("/user", userRoutes);
app.use("/products", productRoutes);
app.use("/seller",sellerRoutes);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server running at port ${PORT}`);
    })
})