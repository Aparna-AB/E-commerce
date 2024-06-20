const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3443;
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
const cors = require("cors");
app.use(cors());
const { authenticateToken } = require("./middlewares/jwtAuthentication");
app.use(express.json());
app.get("/", (req, res) => {
  res.send(`<h1> Server working on: http://localhost:${PORT}</h1>`);
});

const dummyDb = [
  {
    username: "elon",
    phoneNumber: "9876542130",
    email: "user1@gmail.com",
    password: "12341234",
    premiumUser: true,
  },
  {
    username: "steve",
    phoneNumber: "9876542130",
    email: "user2@gmail.com",
    password: "abcd1234",
    premiumUser: false,
  },
  {
    username: "mark",
    phoneNumber: "9876542130",
    email: "user3@gmail.com",
    password: "1234abcd",
    premiumUser: true,
  },
];

// payload is a data that we store inside jwt
function generateAccessToken(payload) {
  return jwt.sign(payload, "1234ABCD");
}

app.post("/user/signin", (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    // here use Model.find({email})
    const user = dummyDb.find((user) => user.email === email);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Email or password id incorrect." });
    }

    if (user.password !== password) {
      return res
        .status(404)
        .json({ message: "Email or password id incorrect." });
    }

    const copyUser = { ...user };
    console.log("before copy user", copyUser);
    delete copyUser.password;
    console.log("copy user", copyUser);
    const accessToken = generateAccessToken(copyUser);

    return res
      .status(200)
      .json({ message: "Login Successful", data: user, accessToken });
  } catch (error) {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
  }
});

const dummyPremiumRes = [
  {
    name: "product1",
    price: 1000,
  },
  {
    name: "product2",
    price: 2000,
  },
  {
    name: "product3",
    price: 3000,
  },
];
app.get("/user", authenticateToken, (req, res) => {
  // other validations if needed
  return res.status(200).json({ userData: req.user });
}); 


app.get("/user/premium-products", authenticateToken, (req, res) => {
  // other validations if needed
  res.status(200).json({
    message: "Premium resources",
    userData: req.user,
    data: dummyPremiumRes,
  });
});

app.all("/*", (req, res) => {
  return res.status(404).json({ message: "Route not found." });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error on starting server.");
    return;
  }
  console.log(`Server started on http://localhost:${PORT}`);
});