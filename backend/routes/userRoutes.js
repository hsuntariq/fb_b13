const express = require("express");
const { registerUser } = require("../controller/userController");
const userRouter = express.Router();

userRouter.post("/register-user", registerUser);

module.exports = userRouter;
