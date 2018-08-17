var express = require('express');
var router = express.Router();

var User = require('../models/User')

// /* GET home page. */
router.get('/', function(req, res, next) {
  res.render('blank', { title: 'Express' });
});

/* blank page. */
router.get('/home', function(req, res, next) {
  res.render('Home');
});

/* login page. */
router.get('/login', function(req, res, next) {
  res.render('commons/login', {title: 'Login Form'});
});

/* signup page. */
router.get('/signup', function(req, res, next) {
  res.render('commons/signup', {title: 'Sign Up Page'});
});

/* IT . */
router.get('/IT', function(req, res, next) {
  res.render('student/major/IT');
});

/* Civil. */
router.get('/C', function(req, res, next) {
  res.render('student/major/C');
});

/* EC. */
router.get('/EC', function(req, res, next) {
  res.render('student/major/EC');
});

/* EP. */
router.get('/EP', function(req, res, next) {
  res.render('student/major/EP');
});

/* MP. */
router.get('/MP', function(req, res, next) {
  res.render('student/major/MP');
});

/* MC. */
router.get('/MC', function(req, res, next) {
  res.render('student/major/MC');
});

/*GET new student register. */
router.get('/new', function(req, res, next) {
  res.render('student/new');
});

/*GET old student register. */
router.get('/old', function(req, res, next) {
  res.render('student/old');
});


/*GET old student register. */
router.get('/list', function(req, res, next) {
  res.render('student/list');
});

module.exports = router;
