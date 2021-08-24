const express = require('express');
const router = express.Router();
const redis = require('redis');

// explicit import
const cache = require('../middlewares/cache');

const redis_port = process.env.PORT || 6379;
const client = redis.createClient(redis_port);

router.get('/:username', cache, async (req, res) => {
  try {
    console.log('Fetching ...');
    const {username} = req.params;
    const response = await fetch(`https://api.github.com/users/${username}`);

    const data = await response.json();

    const repos = data.public_repos;

    // set data to redis
    //  first params takes key, hours in sec
    client.setex(username, 3600, repos);

    res.json({
      username: username,
      repos: data,
    });
  } catch (err) {}
});

module.exports = router;
