const express = require('express');
const { adminSignUp, adminLogin } = require("./admin.controller.js");

const adminRoutes = express.Router();

adminRoutes.post("/signUp", adminSignUp);
adminRoutes.post("/login", adminLogin);

module.exports = { adminRoutes };
