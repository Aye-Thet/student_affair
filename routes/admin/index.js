var express = require('express');
var router = express.Router();

// var Student = require('../models/Student');
var users = require('./users');

// //admin role check
// router.use(function(req, res, next) {
//   if(req.session.user.role == 'ADMIN'){
//     next();
//   }else{
//     req.flash('warning', 'Not allowed user! Please login with admin account!')
//     res.redirect('/signin');
//   }
// });
//
router.get('/', function(req, res){
  res.render('/home', {title: 'Home page'});
});

// router.use('/users', users);

module.exports = router;
