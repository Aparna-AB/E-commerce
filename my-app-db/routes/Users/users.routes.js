const express =require('express');
const {validateEmail} =require("../../middlewares/validateEmail.js");
const { authenticateToken } = require("../../middlewares/jwtAuthentication.js");
const {upload}=require('../../middlewares/uploadFile.js');

const userRoutes=express.Router();
const {createUser,allUsers,userLogin, getUserDetailsByUserId, userUpdate, deleteUser}=require("./users.controller.js");

userRoutes.post("/signUp",upload.single("profilePic"),validateEmail,createUser);
userRoutes.post("/login",validateEmail,userLogin);
userRoutes.get("/allUsers",authenticateToken,allUsers);
userRoutes.get("/:userId",authenticateToken, getUserDetailsByUserId);
userRoutes.patch("/:id",userUpdate);
userRoutes.delete("/:id",deleteUser);


module.exports={userRoutes}