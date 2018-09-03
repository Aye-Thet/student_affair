var express = require('express');
var router = express.Router();

var Student = require('../../models/Student');

/*GET student list page. */
router.get('/list', function(req, res, next) {
  var params = [req.body.keyword || '',req.body.keyword || ''];
  Student.find(params, function(err, users) {
    if (err) next (err);
    res.render('student/list', {title: 'Stuent List', users: users });
  });
});

/*GET new student register. */
router.get('/new', function(req, res, next) {
  res.render('student/new');
});

/*POST new student register. */
router.post('/new', function(req, res, next) {
  var params = [
    req.body.name,
    req.body.s_year,
    req.body.nrc_no,
    req.body.photo,
    req.body.gender,
    req.body.birthday,
    req.body.religion,
    req.body.nationality,
    req.body.address,
    req.body.phone_no,
    req.body.father_name,
    req.body.f_nrc,
    req.body.f_occupation,
    req.body.f_religion,
    req.body.f_nationality,
    req.body.mother_name,
    req.body.m_nrc,
    req.body.m_occupation,
    req.body.m_religion,
    req.body.m_nationality,
    req.body.high_school_name,
    req.body.high_school_success_year,
    req.body.high_school_roll_no,
    req.body.high_school_total_mark,
    req.body.high_school_subject_mark,
    req.body.examiner_dep,
    req.body.health_rec,
    req.body.police_rec
  ];
  Student.addNew(params, function(err, newStu) {
    console.log('Data', params);
    if(err) next (err);
    res.end('Success');
  });
});

/*GET old student register. */
router.get('/old', function(req, res, next) {
  res.render('student/old');
});

/*POST old student register. */
router.post('/old', function(req, res, next) {
  var params = [
    req.body.entry_no,
    req.body.name,
    req.body.s_year,
    req.body.roll_no,
    req.body.nrc_no,
    req.body.photo,
    req.body.gender,
    req.body.birthday,
    req.body.religion,
    req.body.nationality,
    req.body.address,
    req.body.phone_no,
    req.body.father_name,
    req.body.f_nrc,
    req.body.f_occupation,
    req.body.f_religion,
    req.body.f_nationality,
    req.body.mother_name,
    req.body.m_nrc,
    req.body.m_occupation,
    req.body.m_religion,
    req.body.m_nationality,
    req.body.high_school_success_year,
    req.body.high_school_roll_no
  ];
  Student.addOld(params, function(err, result) {
    console.log('Data', params);
    if(err) next (err);
    console.log('result', result);
    req.flash('warn', 'Insert Success');
    res.redirect('/admin/users/view/'+ result.insertId);
  });
});

/*GET old student register. */
router.get('/view/:id', function(req, res, next) {
  console.log('call');
  Student.findByID(req.params.id, function(err, oldStu) {
    if(err) throw err;
    console.log('////',oldStu);
    if(oldStu.length == 0 ) next(new Error('User data not Found!'));

    res.render('student/view', {title: 'Student View', oldStu: oldStu[0]});
  });
});

/* GET remove */
router.post('/remove', function(req, res, next){
  Student.remove(req.body.old_stuid, function(err, user) {
    if (err) throw err;
    req.flash('info', 'Successfully');
    res.redirect('/admin/users/list');
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

/*GET add student attendence. */
router.get('/add_attendance', function(req, res, next) {
  res.render('attendance/add_attendance');
});

module.exports = router;
