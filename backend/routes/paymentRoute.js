const express = require("express");
const { buyProduct } = require("../controller/paymentController");
const paymentRouter = express.Router();

paymentRouter.post("/checkout", buyProduct);

module.exports = paymentRouter;
