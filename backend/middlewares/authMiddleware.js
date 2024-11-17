const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // extract token from bearer
    token = req.headers.authorization.split(" ")[1];
    //    decode the token
    let decode = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decode.id);
    next();
  } else {
    res.status(401);
    throw new Error("Session expired");
  }
});

module.exports = authMiddleware;

// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Mzc2MWU0ZGI1OGJiNzkzZGUwODI2OSIsImlhdCI6MTczMTc2MzUxOCwiZXhwIjoxNzM0MzU1NTE4fQ.67gMVjDaqce3W1lqJolZFYl3s2L1z3uMUYgC4yYARbo
