const express = require('express');

const router = express.Router();
const Users = require('./userDb');
const Posts = require('../posts/postDb');

router.post('/', validateUser, async(req, res) => {
  // do your magic!
  try {
    const { name } = req.body;
    const addUser = await Users.insert(name);
    res.json(addUser);
  } catch (err) {
    res.json(err.message);
  }
});

router.post('/:id/posts', validateUserId, async (req, res) => {
  // do your magic!
  try {
    const { id } = req.params;
    const { user_id, text} = req.body;
    const addUserPost = await Posts.insert({text, user_id: id});
    res.json(addUserPost);
  } catch (err) {
    res.json(err.message);
  }
});

router.get('/', async (req, res) => {
  // do your magic!
  const getUsers = await Users.get(req.body);
  res.json(getUsers);
});

router.get('/:id', validateUserId, async (req, res) => {
  // do your magic!
  try {
    const { id } = req.params;
    const getById = await Users.getById(id);
    res.json(getById);
  } catch (err) {
    res.json(err.message);
  }
});


router.get('/:id/posts', async (req, res) => {
  // do your magic!
  try {
    const { id } = req.params;
    const getPostById = await Posts.getById(id);
    res.json(getPostById);
  } catch (err) {
    res.json(err.message);
  }
});

router.delete('/:id', validateUserId,  async (req, res) => {
  // do your magic!
  try {
    const { id } = req.params;
    const deleteById = await Users.remove(id);
    res.json(deleteById);
  } catch (err) {
    res.json(err.message);
  }
});

router.put('/:id', validateUserId,  async (req, res) => {
  // do your magic!
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateById = await Users.update(id, {name});
    res.json(updateById);
  } catch (err) {
    res.json(err.message);
  }
});

//custom middleware

async function validateUserId(req, res, next) {
  // do your magic!  
  try {
    const User = await Users.getById(req.params.id);
    if (!User) {
      res.status(404).json({ message: 'invalid user id' });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving the hub',
    });
  }
}

function validateUser(req, res, next) {
  // do your magic
    if (Object.keys(req.body.length) === 0) {
      res.status(404).json({ message: 'missing user data'});
    } else if (!req.body.name) {
      res.status(400).json({ message: 'missing required field'});
    } else {
      next()
    }
}

module.exports = router;
