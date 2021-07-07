const express = require('express');
const server = express();
// server.use(logger);

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');  
server.use(express.json());
server.use('/api/users', logger, userRouter);
server.use('/api/posts/', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
  function logger (req, res, next){
    console.log(req.method, req.url, {"timestamp": new Date()}) ;
  next();
}


module.exports = server;