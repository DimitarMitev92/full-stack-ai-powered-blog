import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, image, isPublished } =
      JSON.parse(req.body.blog);
    const imageFile = req.file;

    // Check if all fields are provided
    if (!title || !description || !category || !imageFile || !isPublished) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload the image to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/quickblog",
    });

    // Optimizing the image
    const optimizedImageUrl = await imagekit.url({
      path: response.filePath,
      transformation: [
        {
          quality: "auto",
        },
        {
          format: "webp",
        },
        {
          width: 1280,
        },
      ],
    });

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image: optimizedImageUrl,
      isPublished,
    });

    res.status(200).json({ message: "Blog added successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.status(200).json({ blogs, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog)
      return res
        .status(404)
        .json({ message: "Blog not found", success: false });
    res.status(200).json({ blog, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog)
      return res
        .status(404)
        .json({ message: "Blog not found", success: false });
    // Delete all comments related to the blog
    await Comment.deleteMany({ blog: id });
    res
      .status(200)
      .json({ message: "Blog deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    if (!blog)
      return res
        .status(404)
        .json({ message: "Blog not found", success: false });
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res
      .status(200)
      .json({ message: "Blog updated successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    await Comment.create({ blog, name, content });
    res
      .status(200)
      .json({ message: "Comment added for review", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });
    res.status(200).json({ comments, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
