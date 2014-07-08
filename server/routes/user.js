var express = require('express');

module.exports = function(app) {
  var userRouter = express.Router();

  userRouter.get('/', function(req, res) {
    res.send({user:[]});
  });

  app.use('/api/user', userRouter);
};