const express = require('express');
const { getById } = require('./userDb');

const router = express.Router();
const Users = require('./userDb');

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!

});

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


router.get('/:id/posts', async (req, res) => {
  // do your magic!
    try {
      const { id } = req.params;
      const getPostById = await Users.getUserPosts(id);
      res.json(getPostById);
    } catch (err){
      res.json(err.message);
    }
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
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
