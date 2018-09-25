var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Student = require('../models/Student');

// /* GET blank page. */
router.get('/blank', function(req, res, next) {
  res.render('blank', { title: 'Blank Page' });
});

// /* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Home Page' });
});

/* GET signup page. */
router.get('/signup', function(req, res, next) {
    res.render('commons/signup', {title: 'Sign up Page'});
});

/* POST signup page. */
router.post('/signup', function(req, res, next) {
  var params = [req.body.name, req.body.email, req.body.password];
  User.findByEmail(req.body.email, function(err, rows){
    if(err) throw err;
    if(rows.length > 0){
      req.flash('warn', 'Duplicated email!');
      res.redirect('/signup');
    }else{
      User.add(params, function(err2, result){
        if(err2) throw err2;
        res.redirect('/login')
      });
    }
  });
});

router.post('/dupemail', function(req, res, next){
  User.findByEmail(req.body.email, function(err, rows){
    if(err) throw err;
    if(rows.length > 0){
      res.json({ status: true, msg: 'Duplicated email!'});
    }else{
      res.json({ status: false});
    }
  });
});

/* GET login page. */
router.get('/', function(req, res, next) {
  var email = (req.cookies.email)?req.cookies.email:'';
  res.render('commons/login', {title: 'Login Form', email:email});
});

/* POST login action. */
router.post('/login', function(req, res, next){
  User.findByEmail(req.body.email, function(err, user){
    if(err) next(err);
    if(user.length == 0 || !User.compare(req.body.password, user[0].password)){
      req.flash('warning', 'Email not exists or password not matched!!');
      res.redirect('/login');
    }else{
      req.session.user = { uid: user[0].uid, name: user[0].name, email: user[0].email, role: user[0].role}
      if(req.body.rememberme) res.cookie('email', user[0].email, {maxAge: 86400*7})
      else res.cookie('email', '', {maxAge: 0});
      res.redirect('/home');
    }
  });
});

/* GET signout. */
router.get('/logout', function(req, res, next){
  req.session.destroy();
  res.redirect('/');
});

/* test table */
router.get('/tables_dynamic', function(req, res, next) {
  res.render('tables_dynamic');
});


module.exports = router;
