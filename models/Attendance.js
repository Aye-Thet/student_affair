var db = require('../dbconn');
var bcrypt = require('bcrypt-nodejs');

var Attendance = {
  addAttendance: function(params, callback) {
    var sql = "INSERT INTO attendance ( attendance_id, old_stuid, name, roll_no, december, january, february, march, jun, july, august, september) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    return db.query(sql, params, callback);
  },
  findByID: function(student_id, callback) {
    var sql = "SELECT attendance_id, student_id, name, roll_no, major, s_year, december, january, february, march, jun, july, august, september FROM attendance WHERE student_id = ?";
    return db.query(sql, [student_id], callback);
  },
  update: function (value,sel,callback) {
    console.log(value,sel);
    var query ="";
    switch (sel) {
      case '1':
        query += "december="+value[0];
        break;
      case '2':
        query += "january="+value[0];
        break;
      case '3':
        query += "february="+value[0];
        break;
      case '4':
        query += "march="+value[0];
        break;
      case '5':
        query += "jun="+value[0];
        break;
      case '6':
        query += "july="+value[0];
        break;
      case '7':
        query += "august="+value[0];
        break;
      case '8':
        query += "september="+value[0];
        break;
      default:
        console.log('something is wrong');
    }
    var sql = 'UPDATE attendance SET '+query+' ,updated = NOW() WHERE student_id = '+value[1];
    console.log(sql);
    return db.query(sql, [value], callback);
  },
  find: function(params, callback) {
    var sql = "SELECT attendance_id,student_id, name, roll_no, major, s_year, december, january, february, march, jun, july, august, september FROM attendance ";
    if(params[0] != undefined && params[1] != undefined) sql +="WHERE s_year = ? AND major = ?";
    return db.query(sql, params, callback);
  },
  init: function (update, callback) {
    console.log(update);
    var sql = 'INSERT INTO attendance (student_id, name, roll_no, major, s_year) VALUES ?';
    console.log(sql);
    return db.query(sql,[update],callback);
  },
  // compare: function(cleartext, encrypted){
  //   return bcrypt.compareSync(cleartext, encrypted);
  // }
};



module.exports = Attendance;
