import express from "express";
import { addBlog } from "../controllers/blogController.JS";
import upload from "../middleware/multer";
import auth from "../middleware/auth";

const blogRouter = express.Router();

blogRouter.post("/add", auth, upload.single("image"), addBlog);

export default blogRouter;
