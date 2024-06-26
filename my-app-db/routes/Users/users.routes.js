const express =require('express');
const {validateEmail} =require("../../middlewares/validateEmail.js");
const { authenticateToken } = require("../../middlewares/jwtAuthentication.js");

const userRoutes=express.Router();
const {createUser,allUsers,userLogin, getUserDetailsByUserId, userUpdate}=require("./users.controller.js");

userRoutes.post("/signUp",validateEmail,createUser);
userRoutes.post("/login",validateEmail,userLogin);
userRoutes.get("/allUsers",authenticateToken,allUsers);
userRoutes.get("/:userId",authenticateToken, getUserDetailsByUserId);
userRoutes.patch("/:id",userUpdate);

module.exports={userRoutes}