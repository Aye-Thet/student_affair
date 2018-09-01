var db = require('../dbconn');
var bcrypt = require('bcrypt-nodejs');

var Student = {
  addNew: function(params, callback){
    var sql = 'INSERT INTO new_student (name, s_year, nrc_no, photo, gender, birthday, religion, nationality, address, phone_no, father_name, f_nrc, f_occupation, f_religion, f_nationality, mother_name, m_nrc, m_occupation, m_religion, m_nationality, high_school_name, high_school_success_year, high_school_roll_no, high_school_total_mark, high_school_subject_mark, examiner_dep, health_rec, police_rec) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return db.query(sql, params, callback);
  },
  addOld: function(params, callback){
    var sql = 'INSERT INTO old_student (name, s_year, nrc_no, photo, gender, birthday, religion, nationality, address, phone_no, father_name, f_nrc, f_occupation, f_religion, f_nationality, mother_name, m_nrc, m_occupation, m_religion, m_nationality, high_school_success_year, high_school_roll_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
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
