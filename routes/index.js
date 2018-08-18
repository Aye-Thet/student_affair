var express = require('express');
var router = express.Router();

var User = require('../models/User');

// /* GET home page. */
router.get('/', function(req, res, next) {
  res.render('blank', { title: 'Express' });
});

/* blank page. */
router.get('/home', function(req, res, next) {
  res.render('Home');
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
  res.render('commons/login', {title: 'Login Form'});
});

/* POST login action. */
router.post('/login', function(req, res, next){
  User.findByEmail(req.body.email, function(err, user){
    if(err) next(err);
    if(user.length == 0 || !User.compare(req.body.password, user[0].password)){
      req.flash('warning', 'Email not exists or password not matched!!');
      res.redirect('/login');
    }else{
      req.session.user = { uid: user[0].uid, name: user[0].name, email: user[0].email}
      res.redirect('/');
    }
  });
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

// /*GET Test register. */
// router.get('/sample', function(req, res, next) {
//   res.render('commons/sample');
// });


module.exports = router;
