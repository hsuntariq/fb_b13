const asyncHandler = require("express-async-handler");
const requestModel = require("../models/requestModel");

const addFriend = asyncHandler(async (req, res) => {
  const to = req.params.to;
  const from = req.user._id;

  // Check if a similar request already exists
  const existingRequest = await requestModel.findOne({
    "sendRequests.from": from,
    "sendRequests.to": to,
  });

  if (existingRequest) {
    res.status(400);
    throw new Error("Already requested");
  }

  // Create a new friend request - user 1 = ahmed = from
  const newRequest = await requestModel.create({
    sendRequests: [{ from, to }],
    receivedRequests: [{ from: to, to: from }],
  });

  res.send(newRequest);
});

module.exports = {
  addFriend,
};
