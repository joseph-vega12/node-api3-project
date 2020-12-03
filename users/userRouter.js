const express = require('express');

const router = express.Router();
const Users = require('./userDb');
const Posts = require('../posts/postDb');

router.post('/', validateUser, async(req, res) => {
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
// - this middleware will be used for all endpoints that include an `id` parameter in the url (ex: `/api/users/:id` and it should check the database to make sure there is a user with that id. If there is no user with that id return HTTP status code 404 and a useful error message. If a user with that id is found, then let the request continue.
// - if the `id` parameter is valid, store that user object as `req.user`
// - if the `id` parameter does not match any user id in the database, respond with status `400` and `{ message: "invalid user id" }`

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
