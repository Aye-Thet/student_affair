var db = require('../dbconn');
var bcrypt = require('bcrypt-nodejs');

var Student = {
  addOld: function(params, callback){
    var sql = "INSERT INTO old_student (entry_no, name, s_year, roll_no, nrc_no, photo, gender, birthday, religion, nationality, address, phone_no, father_name, f_nrc, f_occupation, f_religion, f_nationality, mother_name, m_nrc, m_occupation, m_religion, m_nationality, high_school_success_year, high_school_roll_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    return db.query(sql, params, callback);
  },
  findByID: function(old_stuid, callback){
    console.log('findByID');
    var sql = "SELECT old_stuid, entry_no, name, s_year, roll_no, nrc_no, photo, gender, birthday, religion, nationality, address, phone_no, father_name, f_nrc, f_occupation, f_religion, f_nationality, mother_name, m_nrc, m_occupation, m_religion, m_nationality, high_school_success_year, high_school_roll_no, DATE_FORMAT(updated, '%d/%m/%Y')AS updated FROM old_student WHERE old_stuid = ?";
    return db.query(sql, [old_stuid], callback);
  },
  update: function(params, callback) {
    console.log(params);
    var sql = "UPDATE old_student SET entry_no =?, name =?, s_year =?, roll_no =?, nrc_no =?, photo =?, gender =?, birthday =?, religion =?, nationality =?, address =?, phone_no =?, father_name =?, f_nrc =?, f_occupation =?, f_religion =?, f_nationality =?, mother_name =?, m_nrc =?, m_occupation =?, m_religion =?, m_nationality =?, high_school_success_year =?, high_school_roll_no =?, updated = NOW() WHERE old_stuid = ?";
    return db.query(sql, params, callback);
  },
  remove: function(old_stuid, callback) {
    var sql = "DELETE FROM old_student WHERE old_stuid = ?";
    return db.query(sql, [old_stuid], callback);
  },
  find: function(params, callback){
    var sql = "SELECT old_stuid, entry_no, name, s_year, roll_no, nrc_no, photo, gender, birthday, religion, nationality, address, phone_no, father_name, f_nrc, f_occupation, f_religion, f_nationality, mother_name, m_nrc, m_occupation, m_religion, m_nationality, high_school_success_year, high_school_roll_no, updated, DATE_FORMAT(birthday, '%d/%m/%Y') FROM old_student";
    if(params[0] != '')
    sql += " WHERE name LIKE concat('%', ?, '%')";
    return db.query(sql, params, callback);
  },
  compare: function(cleartext, encrypted){
    return bcrypt.compareSync(cleartext, encrypted);
  }
};

module.exports = Student;
