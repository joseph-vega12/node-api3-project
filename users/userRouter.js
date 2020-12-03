const express = require('express');

const router = express.Router();
const Users = require('./userDb');
const Posts = require('../posts/postDb');
const { del } = require('../data/dbConfig');

router.post('/', async (req, res) => {
  // do your magic!
  try {
    const { name } = req.body;
    const addUser = await Users.insert({ name });
    res.json(addUser);
  } catch (err) {
    res.json(err.message);
  }
});

// router.post('/:id/posts', async (req, res) => {
//   // do your magic!
//   try {
//     const { id } = req.params;
//     const { text, postedBy } = req.body;
//     const addUserPost = await Users.insert({id, text, postedBy});
//     res.json(addUserPost);
//   } catch (err) {
//     res.json(err.message);
//   }
// });

router.get('/', async (req, res) => {
  // do your magic!
  const getUsers = await Users.get(req.params.body);
  res.json(getUsers);
});

router.get('/:id', async (req, res) => {
  // do your magic!
  try {
    const { id } = req.params;
    const getById = await Users.getById(id);
    res.json(getById);
  } catch (err) {
    res.json(err.message);
  }
});


// router.get('/:id/posts', async (req, res) => {
//   // do your magic!
//   try {
//     const { id } = req.params;
//     const getPostById = await Posts.getById(id);
//     res.json(getPostById);
//   } catch (err) {
//     res.json(err.message);
//   }
// });

router.delete('/:id', async (req, res) => {
  // do your magic!
  try {
    const { id } = req.params;
    const deleteById = await Users.remove(id);
    res.json(deleteById);
  } catch (err) {
    res.json(err.message);
  }
});

router.put('/:id', async (req, res) => {
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

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
