var db = require('../dbconn');
var bcrypt = require('bcrypt-nodejs');

var Student = {
  add: function(params, callback){
    var sql = 'INSERT INTO new_student (new_stuid, stu_name, s_year, nrc_no, photo, gender, birthday, religion, nationality, address, phone_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    params[10] = bcrypt.hashSync(params[10], bcrypt.genSaltSync(8), null);
    return db.query(sql, params, callback);
  },
  findByID: function(new_stuid, callback){
    var sql = 'SELECT * FROM new_student WHERE id = ?';
    return db.query(sql, [new_stuid], callback);
  },
  compare: function(cleartext, encrypted){
    return bcrypt.compareSync(cleartext, encrypted);
  }
};

module.exports = Student;
