const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();

const multer = require('multer');

const PORT = process.env.PORT || 3080;

const { connectDB } = require("./connectDB.js");
const { userRoutes } = require("./routes/Users/users.routes.js");
const { productRoutes } = require("./routes/Products/products.routes.js");
const { sellerRoutes } = require("./routes/Seller/seller.routes.js");
const { adminRoutes } = require("./routes/Admin/admin.routes.js");


app.get("/", (req, res) => {
    res.send("Home Page");
});

app.use("/user", userRoutes);
app.use("/products", productRoutes);
app.use("/seller", sellerRoutes);
app.use("/admin", adminRoutes);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server running at port http://localhost:${PORT}`);
    })
})