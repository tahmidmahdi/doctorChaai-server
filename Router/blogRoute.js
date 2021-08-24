const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const blogSchema = require('../schemas/blogSchema');
const blog = new mongoose.model('blogSchema', blogSchema);
const redis = require('redis');
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

router.get('/repos/:username', async (req, res) => {
  try {
    console.log('Fetching ...');
    const {username} = req.params;
    const response = await fetch(`https://api.github.com/users/${username}`);

    const data = await response.json();

    const repos = data.public_repos;

    // set data to redis
    //  first params takes key, hours in sec
    client.setex(username, 3600, repos);

    res.send(setResponse(username, repos));
  } catch (err) {}
});
module.exports = router;
