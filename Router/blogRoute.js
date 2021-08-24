const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const blogSchema = require('../schemas/blogSchema');
const blog = new mongoose.model('blogSchema', blogSchema);

// admin blog post
router.post('/addBlog', async (req, res) => {
  try {
    const blogPost = await new blog(req.body);
    blogPost.save();
    res.status(200).json({
      message: 'Successfully blog added',
      status: true,
    });
  } catch {
    res.status(200).json({
      message: 'There is a Error with your request',
      status: false,
    });
  }
});

// admin blog post get
router.get('/getBlog', async (req, res) => {
  try {
    const blogPost = await blog.find({});
    res.status(200).json({
      result: blogPost,
      status: true,
    });
  } catch {
    res.status(200).json({
      message: 'There is a Error with your request',
      status: false,
    });
  }
});
module.exports = router;
