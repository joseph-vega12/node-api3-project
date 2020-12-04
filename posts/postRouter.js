const express = require('express');
const Post = require('../posts/postDb');
const { getById } = require('../users/userDb');

const router = express.Router();

router.get('/', async (req, res) => {
  // do your magic!
  try {
    const getPosts = await Post.get(req.body);
    res.json(getPosts);
  } catch (err) {
    res.json(error.message);
  }
});

router.get('/:id', async (req, res) => {
  // do your magic!
  const { id } = req.params;
  try {
    const getPostById = await Post.getById(id);
    res.json(getPostById);
  } catch (err) {
    res.json(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  // do your magic!
  const { id } = req.params;
  try {
    const deleteById = await Post.remove(id);
    res.json(deleteById); 
  } catch (err) {
    res.json(err.message);
  }
});

router.put('/:id', async (req, res) => {
  // do your magic!
  const { id } = req.params;
  const { text } = req.body;
  try {
    const UpdateById = await Post.update(id, { text }); 
    res.json(UpdateById);
  } catch (err) {
    res.json(err.message);
  }
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
