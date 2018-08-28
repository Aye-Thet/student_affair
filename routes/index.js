var express = require('express');
var router = express.Router();

var User = require('../models/User');
var Student = require('../models/Student');

// /* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Home', { title: 'Home Page' });
});

/* GET signup page. */
router.get('/signup', function(req, res, next) {
  res.render('commons/signup', {title: 'Sign Up Page'});
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
router.get('/login', function(req, res, next) {
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
      res.redirect('/');
    }
  });
});

/*GET new student register. */
router.get('/new', function(req, res, next) {
  res.render('student/new');
});

/*POST new student register. */
router.post('/new', function(req, res, next) {
  var params = [
    req.body.new_stuid,
    req.body.name,
    req.body.s_year,
    req.body.nrc_no,
    req.body.photo,
    req.body.gender,
    req.body.birthday,
    req.body.religion,
    req.body.nationality,
    req.body.address,
    req.body.phone_no
  ];
  Student.add(params, function(err, newStu) {
    console.log('Data', params);
    if(err) next (err);
    res.end('Success');
  });
});

/*GET old student register. */
router.get('/old', function(req, res, next) {
  res.render('student/old');
});

/*GET old student register. */
router.get('/view', function(req, res, next) {
  res.render('student/new_view');
});

/* GET signout. */
router.get('/logout', function(req, res, next){
  req.session.destroy();
  res.redirect('/');
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

/*GET old student register. */
router.get('/list', function(req, res, next) {
  res.render('student/list');
});

/*GET first year Civil. */
router.get('/first_C', function(req, res, next) {
  res.render('student/year/first_C');
});

/*GET second year Civil. */
router.get('/second_C', function(req, res, next) {
  res.render('student/year/second_C');
});

/*GET third year Civil. */
router.get('/third_C', function(req, res, next) {
  res.render('student/year/third_C');
});

/*GET third year Civil. */
router.get('/forth_C', function(req, res, next) {
  res.render('student/year/forth_C');
});

module.exports = router;
