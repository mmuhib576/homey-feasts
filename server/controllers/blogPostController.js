const blogPostModel = require("../models/blogPostModel");

const createBlog = async (req, res) => {
  try {
    const { title, description, chef, user } = req.body;
    const blog = new blogPostModel({ title, description, chef, user });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Could not create blog post" });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogPostModel.find().populate("user chef");
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch blogs" });
  }
};

const getChefBlogs = async (req, res) => {
  try {
    const blogs = await blogPostModel.find({ chef: req.params.chefId });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch blogs" });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { title, content, image, tags } = req.body;
    const updatedBlog = await blogPostModel.findByIdAndUpdate(
      req.params.blogId,
      { title, content, image, tags },
      { new: true }
    );
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: "Could not update blog post" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const deleteBlog = await blogPostModel.findByIdAndDelete({
      _id: req.params.blogId,
    });
    res.status(200).send("deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getChefBlogs,
  updateBlog,
  deleteBlog,
};
