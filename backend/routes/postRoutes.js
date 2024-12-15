const express = require("express");
const {
  uploadPost,
  getPosts,
  addComment,
} = require("../controller/postController");
const authMiddleware = require("../middlewares/authMiddleware");
const postRouter = express.Router();

postRouter.post("/upload-post/", authMiddleware, uploadPost);
postRouter.get("/get-posts", getPosts);
postRouter.post("/add-comment", authMiddleware, addComment);
module.exports = postRouter;
