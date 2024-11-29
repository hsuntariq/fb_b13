const express = require("express");
const { addFriend, getMyRequests } = require("../controller/requestController");
const authMiddleware = require("../middlewares/authMiddleware");

const requestRouter = express.Router();

requestRouter.post("/add-friend-request/:to", authMiddleware, addFriend);
requestRouter.get("/my-requests", authMiddleware, getMyRequests);

module.exports = requestRouter;
