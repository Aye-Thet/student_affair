var express = require('express');
var router = express.Router();
var users = require('./users');

//GET home page .
router.get('/', function(req, res){
  res.render('/home', {title: 'Home page'});
});

router.use('/users', users);

module.exports = router;
