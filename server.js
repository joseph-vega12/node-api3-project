const express = require('express');
const server = express();
// server.use(logger);

const Users = require('./users/userDb');

const userRouter = require('./users/userRouter');
server.use(express.json());
server.use('/api/users', logger, userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
  function logger (req, res, next){
    console.log(req.method, req.url, {"timestamp": new Date()}) ;
  next();
}


module.exports = server;