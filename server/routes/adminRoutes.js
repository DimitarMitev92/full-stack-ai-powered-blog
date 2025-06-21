import express from "express";
import {
  adminLogin,
  getAllCommentsAdmin,
  getAllBlogsAdmin,
  deleteCommentByIdAdmin,
  approveCommentByIdAdmin,
  getDashboardAdmin,
} from "../controllers/adminController.js";
import auth from "../middleware/auth.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
// Routes for blog
adminRouter.get("/comments", auth, getAllCommentsAdmin);
adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.post("/delete-comment", auth, deleteCommentByIdAdmin);
adminRouter.post("/approve-comment", auth, approveCommentByIdAdmin);
adminRouter.get("/dashboard", auth, getDashboardAdmin);

export default adminRouter;
