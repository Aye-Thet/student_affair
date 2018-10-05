var express = require('express');
var router = express.Router();

var Student = require('../../models/Student');
var Newstudent = require('../../models/Newstudent');
var Attendance = require('../../models/Attendance');
var Subject = require('../../models/Subject');
var CreateDB = require('../../models/CreateDB');

/*GET student list page. */
router.all('/list', function(req, res, next) {
  var p = {
    year: req.query.year,
    major: req.query.major,
  };
  var params = [p.year, p.major];
  Student.find(params, function(err, users) {
    if (err) next (err);
    res.render('student/list', {title: 'Stuent List', users: users});
  });
});

/*GET New student list page. */
router.all('/new_list', function(req, res, next) {
  var params = [req.body.keyword || '',req.body.keyword || ''];
  Newstudent.find(params, function(err, users) {
    if (err) next (err);
    res.render('student/new_list', {title: 'New Stuent List', users: users });
  });
});

/*GET new student register. */
router.get('/new', function(req, res, next) {
  res.render('student/new');
});

/*POST new student register. */
router.post('/new', function(req, res, next) {
  var params = [
    req.body.academic,
    req.body.student_id,
    req.body.name,
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
    req.body.mat_cer,
    req.body.high_school_subject_mark,
    req.body.examiner_dep,
    req.body.health_rec,
    req.body.police_rec,
    req.body.quarter_rec,
  ];
  Newstudent.addNew(params, function(err, result) {
    console.log('Data', params);
    if(err) next (err);
    console.log('result', result);
    req.flash('warn', 'Insert Success');
    res.redirect('/admin/users/new_view/'+ result.insertId);
  });
});

router.get('/new_view/:id', function(req, res, next) {
  Newstudent.findByID(req.params.id, function(err, newStu) {
    if(err) throw err;
    if(newStu.length == 0 ) next (new Error('User data not found!!!'));
    res.render('student/new_view', {title: 'New Student View', users: newStu[0]});
  });
});

/* GET modify new student */
router.get('/new_modify/:new_stuid', function(req, res, next) {
  Newstudent.findByID(req.params.new_stuid, function(err, newStu) {
    if(err) throw err;
    if(newStu.length == 0) next (new Error('User data not found!!!'));
    res.render('student/new_modify', {title: 'Modify New Student', users: newStu[0]});
  });
});

router.post('/new_modify', function(req, res, next) {
  var params = [
    req.body.academic,
    req.body.student_id,
    req.body.new_stuid,
    req.body.name,
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
    req.body.mat_cer,
    req.body.examiner_dep,
    req.body.health_rec,
    req.body.police_rec,
    req.body.quarter_rec,
  ];
  Newstudent.findByID( req.body.new_stuid, function(err, users) {
    if (err) throw err;
    if(users.length == 0) next(new Error('User data not found!!!'));
    Newstudent.update(params, function(uerr, uuser) {
      if(uerr) throw uerr;
      console.log();
      req.flash('info', 'Success Updated');
      res.redirect('/admin/users/new_view/'+ users[0].new_stuid);
    });
  });
});

/* GET remove */
router.post('/new_remove', function(req, res, next){
  Newstudent.remove(req.body.new_stuid, function(err, user) {
    if (err) throw err;
    req.flash('info', 'Successfully');
    res.redirect('/admin/users/new_list');
  });
});

/*GET new student major choose. */
router.get('/majorchoose/:new_stuid', function(req, res, next) {
  Newstudent.findByID(req.params.new_stuid, function(err, newStu) {
    if(err) throw err;
    if(newStu.length == 0) next (new Error('User data not found!!'));
    res.render('student/majorchoose', {title: 'Major Choose', users: newStu[0]});
  });
});

/*GET old student register. */
router.get('/old', function(req, res, next) {
  res.render('student/old');
});

/*POST old student register. */
router.post('/old', function(req, res, next) {
  var params = [
    req.body.academic,
    req.body.student_id,
    req.body.name,
    req.body.major,
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
    req.body.high_school_roll_no,
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

    res.render('student/view', {title: 'Student View', users: oldStu[0]});
  });
});

/* GET modify old student */
router.get('/modify/:old_stuid', function(req, res, next) {
  Student.findByID(req.params.old_stuid, function(err, oldStu) {
    if(err) throw err;
    if(oldStu.length == 0) next (new Error('User data not found!!!'));
    res.render('student/modify', {title: 'Modify Old Student', users: oldStu[0]});
  });
});

/* POST old student modify */
router.post('/modify', function(req, res, next) {
  var params = [
    req.body.academic,
    req.body.student_id,
    req.body.name,
    req.body.major,
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
    req.body.high_school_roll_no,
    req.body.old_stuid
  ];
  Student.findByID( req.body.old_stuid, function(err, users) {
    if (err) throw err;
    if(users.length == 0) next(new Error('User data not found!!!'));
    Student.update(params, function(uerr, uuser) {
      if(uerr) throw uerr;
      console.log();
      req.flash('info', 'Success Updated');
      res.redirect('/admin/users/view/'+ users[0].old_stuid);
    });
  });
});

/* GET remove */
router.post('/remove', function(req, res, next){
  Student.remove(req.body.old_stuid, function(err, user) {
    if (err) throw err;
    req.flash('info', 'Successfully');
    res.redirect('/admin/users/list/?');
  });
});

/* IT . */
router.get('/department', function(req, res, next) {
  res.render('student/major/department', {title: "Department List"});
});

/* IT . */
router.get('/IT', function(req, res, next) {
  res.render('student/major/IT');
});

/* Civil. */
router.get('/C', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('student/major/C', {users: users});
  });
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

/*GET add student attendence. */
router.get('/add_attendance', function(req, res, next) {
  res.render('attendance/add_attendance');
});

/*GET view student attendence. */
router.get('/view_attendance', function(req, res, next) {
  res.render('attendance/view_attendance');
});


/* Civil Attendance. */
router.get('/add_C_attendance', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('attendance/add/add_C_attendance', {users: users});
  });
});

/* EC Attendance. */
router.get('/add_EC_attendance', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('attendance/add/add_EC_attendance', {users: users});
  });
});

/* EP Attendance. */
router.get('/add_EP_attendance', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('attendance/add/add_EP_attendance', {users: users});
  });
});

/* MP Attendance. */
router.get('/add_MP_attendance', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('attendance/add/add_MP_attendance', {users: users});
  });
});

/* MC Attendance. */
router.get('/add_MC_attendance', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('attendance/add/add_MC_attendance', {users: users});
  });
});



/* IT Attendance. */
router.get('/add_IT_attendance', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('attendance/add/add_IT_attendance', {users: users});
  });
});

/* Civil Attendance. */
router.get('/view_C_attendance', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('attendance/view/view_C_attendance', {users: users});
  });
});

/* EC Attendance. */
router.get('/view_EC_attendance', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('attendance/view/view_EC_attendance', {users: users});
  });
});

/* EP Attendance. */
router.get('/view_EP_attendance', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('attendance/view/view_EP_attendance', {users: users});
  });
});

/* MP Attendance. */
router.get('/view_MP_attendance', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('attendance/view/view_MP_attendance', {users: users});
  });
});

/* MC Attendance. */
router.get('/view_MC_attendance', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('attendance/view/view_MC_attendance', {users: users});
  });
});

/* IT Attendance. */
router.get('/view_IT_attendance', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('attendance/view/view_IT_attendance', {users: users});
  });
});


/*GET student list page. */
router.all('/add_attendance_list', function(req, res, next) {
  var p = {
    year: req.query.year,
    major: req.query.major,
  };
  var params = [p.year, p.major];
  Attendance.find(params, function(err, users) {
    if (err) next (err);
    res.render('attendance/add_attendance_list', {title: ' Add Stuent Attendance List', users: users});
  });
});

/*GET student list page. */
router.all('/view_attendance_list', function(req, res, next) {
  var p = {
    year: req.query.year,
    major: req.query.major,
  };
  var params = [p.year, p.major];
  Attendance.find(params, function(err, users) {
    if (err) next (err);
    res.render('attendance/view_attendance_list', {title: ' View Stuent Attendance List', users: users});
  });
});

/* GET init for attendance */
router.get('/attendance/init', function(req, res, next) {
  var student = [];
  Student.find(function (err,stu) {
    if(err) next (err);
    for(var i in stu){
      student.push([stu[i].student_id,stu[i].name,stu[i].roll_no,stu[i].major,stu[i].s_year])
    }
    Attendance.init(student,function (err2,rtn) {
      if(err2) next (err2);
      res.send('success');
    });
  });
});

/* student detail for Attendance . */
router.get('/detail/:id', function(req, res, next) {
  Attendance.findByID(req.params.id,function(err, users) {
    if(err) next (err)
    console.log('lllllll',users);
    res.render('attendance/detail', {users: users[0]});
  });
});

router.post('/detail',function (req,res,next) {
  var value = [req.body.percent,req.body.id];
  Attendance.update(value,req.body.month,function (err,rtn) {
    if(err) next(err);
    res.redirect('/admin/users/view_attendance_list/?year='+req.body.year+'&major='+req.body.major);
  });
});

router.get('/adlist',function (req,res) {
  Attendance.find(function (err,rtn) {
    if(err) throw err;
    res.send(rtn);
  });
});

/*GET add new subject . */
router.get('/addSub', function(req, res, next) {
  res.render('subject/addSub');
});

/*POST old student register. */
router.post('/addSub', function(req, res, next) {
  var params = [
    req.body.sub_name,
    req.body.sub_code,
    req.body.major,
    req.body.s_year,
  ];
  Subject.addSub(params, function(err, result) {
    console.log('Data', params);
    if(err) next (err);
    console.log('result', result);
    req.flash('warn', 'Insert Success');
    res.redirect('/admin/users/sublist');
  });
});

/* GET modify Subject */
router.get('/modifySub/:sub_id', function(req, res, next) {
  Subject.findByID(req.params.sub_id, function(err, users) {
    if(err) throw err;
    if(users.length == 0) next (new Error('Subject data not found!!!'));
    res.render('subject/modifySub', {title: 'Modify Subject', users: users[0]});
  });
});

/* POST subject modify */
router.post('/modifySub', function(req, res, next) {
  var params = [
    req.body.sub_name,
    req.body.sub_code,
    req.body.major,
    req.body.s_year,
    req.body.updated,
  ];
  Subject.findByID(req.body.sub_id, function(err, users) {
    if(err) throw err;
    if(users.length == 0) next (new Error('Subject data not found!!!'));
    Subject.update(params, function(uerr, uuser) {
      if(uerr) throw uerr;
      req.flash('info', 'Success Updated');
      res.redirect('/admin/users/sublist');
    });
  });
});

/*GET Delete Subject. */
router.post('/remove', function(req, res, next) {
  Subject.remove(req.body.sub_id, function(err, user) {
    if(err) throw err;
    req.flash('info', 'Successfully');
    res.redirect('/admin/users/sublist/?');
  });
});

/*GET New student list page. */
router.all('/sublist', function(req, res, next) {
  var params = [req.body.keyword || '',req.body.keyword || ''];
  Subject.find(params, function(err, users) {
    if (err) next (err);
    console.log(users);
    res.render('subject/sublist', {title: 'Subject List', users: users });
  });
});

/*GET Create Database . */
router.get('/CreateDB', function(req, res, next) {
  res.render('DB/CreateDB', {title: "Create Database"});
});

/*POST Crete Database . */
router.post('/CreateDB', function(req, res, next) {
  var params = [req.body.major, req.body.s_year];
  var dbName = req.body.major + req.body.s_year;
  console.log(params);
  Subject.findClass(params, function(err, stu) {
    if(err) next (err);
    console.log('list',stu);
    var name="";
    var list = [];
    for(var i = 0; i < stu.length; i++) {
      name += ", "+ stu[i].sub_name+" INT(20) NOT NULL DEFAULT 0";
    }
    console.log('subj',name);
    CreateDB.generate(dbName.toLowerCase(),name,function(err2, rtn) {
      if(err2) next (err2);
      Student.findStu(params,function (err3,rtn3) {
        if(err3) next (err3);
        for(var k in rtn3){
          list.push([rtn3[k].student_id,rtn3[k].name]);
        }
        CreateDB.insertStu(dbName.toLowerCase(),list,function (err4,rtn4) {
          if(err4) next (err4);
          res.send('Successfully Create!!');
        });
      });
    });

  });
});

/*GET add student exammark. */
router.get('/add_exammark', function(req, res, next) {
  res.render('exammark/add_exammark');
});

/* Add Civil exammark. */
router.get('/add_C_exammark', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('exammark/add/add_C_exammark', {users: users});
  });
});

/* Add EC exammark. */
router.get('/add_EC_exammark', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('exammark/add/add_EC_exammark', {users: users});
  });
});

/* Add EP exammark. */
router.get('/add_EP_exammark', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('exammark/add/add_EP_exammark', {users: users});
  });
});

/* Add MP exammark. */
router.get('/add_MP_exammark', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('exammark/add/add_MP_exammark', {users: users});
  });
});

/* Add MC exammark. */
router.get('/add_MC_exammark', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('exammark/add/add_MC_exammark', {users: users});
  });
});



/* Add IT exammark. */
router.get('/add_IT_exammark', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('exammark/add/add_IT_exammark', {users: users});
  });
});

/*GET student list page. */
router.all('/add_exammark_list', function(req, res, next) {
  var p = {
    major: req.query.major,
    year: req.query.year,
  };
  var params = p.major+ p.year;
  CreateDB.findDB(params.toLowerCase(), function(err, users) {
    if (err) next (err);
    console.log('users', users);
    res.render('exammark/add_exammark_list', {title: ' Add Stuent exammark List', users: users});
  });
});

/* student detail for exammark . */
router.get('/updatemark/:student_id', function(req, res, next) {
  var dbName = req.query.m+ req.query.y;
  var params = [req.query.m,req.query.y]
  console.log(dbName);
  var name =dbName.toLowerCase();
  CreateDB.findByIDone(name,req.params.student_id,function(err, users) {
    if(err) next (err);
    console.log('lllllll',users);
    Subject.findClass(params,function (err2,rtn2) {
      if(err2) next (err2);
      res.render('exammark/updatemark', {users: users[0],subj:rtn2});
    });
  });
});

/* student detail for exammark . */
router.post('/updatemark', function(req, res, next) {
  var dbName = req.body.major+req.body.year;
  // var params = [ req.body.subj, req.body.mark];
    CreateDB.updateMark(dbName.toLowerCase(),req.body.subj,req.body.mark, req.body.id, function(err2, users2) {
      if(err2) throw err2;
      res.redirect('/admin/users/view_exammark_list/?year='+req.body.year+'&major='+req.body.major+'');
    });
  });

router.get('/view_exammark_list/', function(req, res, next) {
  var p = [req.query.major,req.query.year];
  var params = req.query.major+req.query.year;
  CreateDB.findDB(params.toLowerCase(), function(err, users) {
    if(err) next (err);
    Subject.findClass(p,function (err2,rtn2) {
      if(err2) next (err2);
      res.render('exammark/view_exammark_list', {title: 'View Exammark List', users: users,subj:rtn2});
    });
  });
});

/*GET view student attendence. */
router.get('/view_exammark', function(req, res, next) {
  res.render('exammark/view_exammark');
});

/* Civil Attendance. */
router.get('/view_C_exammark', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('exammark/view/view_C_exammark', {users: users});
  });
});

/* EC Attendance. */
router.get('/view_EC_exammark', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('exammark/view/view_EC_exammark', {users: users});
  });
});

/* EP Attendance. */
router.get('/view_EP_exammark', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('exammark/view/view_EP_exammark', {users: users});
  });
});

/* MP Attendance. */
router.get('/view_MP_exammark', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('exammark/view/view_MP_exammark', {users: users});
  });
});

/* MC Attendance. */
router.get('/view_MC_exammark', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('exammark/view/view_MC_exammark', {users: users});
  });
});

/* IT Attendance. */
router.get('/view_IT_exammark', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('exammark/view/view_IT_exammark', {users: users});
  });
});













/*GET add student exammark. */
router.get('/add_grading', function(req, res, next) {
  res.render('grading/add_grading');
});

/* Add Civil exammark. */
router.get('/add_C_grading', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('grading/add/add_C_grading', {users: users});
  });
});

/* Add EC exammark. */
router.get('/add_EC_grading', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('grading/add/add_EC_grading', {users: users});
  });
});

/* Add EP exammark. */
router.get('/add_EP_grading', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('grading/add/add_EP_grading', {users: users});
  });
});

/* Add MP exammark. */
router.get('/add_MP_grading', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('grading/add/add_MP_grading', {users: users});
  });
});

/* Add MC exammark. */
router.get('/add_MC_grading', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('grading/add/add_MC_grading', {users: users});
  });
});



/* Add IT exammark. */
router.get('/add_IT_grading', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('grading/add/add_IT_grading', {users: users});
  });
});

/*GET student list page. */
router.all('/add_grading_list', function(req, res, next) {
  var p = {
    major: req.query.major,
    year: req.query.year,
  };
  var params = p.major+ p.year;
  CreateDB.findDB(params.toLowerCase(), function(err, users) {
    if (err) next (err);
    console.log('users', users);
    res.render('grading/add_grading_list', {title: ' Add Stuent grading List', users: users});
  });
});

/* student detail for exammark . */
router.get('/updategrade/:student_id', function(req, res, next) {
  var dbName = req.query.m+ req.query.y;
  var params = [req.query.m,req.query.y]
  console.log(dbName);
  var name =dbName.toLowerCase();
  CreateDB.findByIDone(name,req.params.student_id,function(err, users) {
    if(err) next (err);
    console.log('lllllll',users);
    Subject.findClass(params,function (err2,rtn2) {
      if(err2) next (err2);
      res.render('grading/updategrade', {users: users[0],subj:rtn2});
    });
  });
});

/* student detail for exammark . */
router.post('/updategrade', function(req, res, next) {
  var dbName = req.body.major+req.body.year;
  // var params = [ req.body.subj, req.body.mark];
    CreateDB.updateMark(dbName.toLowerCase(),req.body.subj,req.body.mark, req.body.id, function(err2, users2) {
      if(err2) throw err2;
      res.redirect('/admin/users/view_grading_list/?year='+req.body.year+'&major='+req.body.major+'');
    });
  });

router.get('/view_grading_list/', function(req, res, next) {
  var p = [req.query.major,req.query.year];
  var params = req.query.major+req.query.year;
  CreateDB.findDB(params.toLowerCase(), function(err, users) {
    if(err) next (err);
    Subject.findClass(p,function (err2,rtn2) {
      if(err2) next (err2);
      res.render('grading/view_grading_list', {title: 'View Grading List', users: users,subj:rtn2});
    });
  });
});

/*GET view student attendence. */
router.get('/view_grading', function(req, res, next) {
  res.render('grading/view_grading');
});

/* Civil Attendance. */
router.get('/view_C_grading', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('grading/view/view_C_grading', {users: users});
  });
});

/* EC Attendance. */
router.get('/view_EC_grading', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('grading/view/view_EC_grading', {users: users});
  });
});

/* EP Attendance. */
router.get('/view_EP_grading', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('grading/view/view_EP_grading', {users: users});
  });
});

/* MP Attendance. */
router.get('/view_MP_grading', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('grading/view/view_MP_grading', {users: users});
  });
});

/* MC Attendance. */
router.get('/view_MC_grading', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('grading/view/view_MC_grading', {users: users});
  });
});

/* IT Attendance. */
router.get('/view_IT_grading', function(req, res, next) {
  Student.find(function(err, users) {
    res.render('grading/view/view_IT_grading', {users: users});
  });
});

module.exports = router;
