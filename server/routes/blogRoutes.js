import express from "express";
import {
  addBlog,
  deleteBlogById,
  getBlogs,
  getBlogById,
  togglePublish,
  addComment,
  getBlogComments,
} from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const blogRouter = express.Router();

// Routes for blog
blogRouter.post("/add", auth, upload.single("image"), addBlog);
blogRouter.get("/all", getBlogs);
blogRouter.get("/:blogId", getBlogById);
blogRouter.post("/delete", auth, deleteBlogById);
blogRouter.post("/toggle-publish", auth, togglePublish);
// Routes for comments
blogRouter.post("/add-comment", addComment);
blogRouter.post("/comments", getBlogComments);

export default blogRouter;
