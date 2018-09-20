var db = require('../dbconn');
var bcrypt = require('bcrypt-nodejs');

var Student = {
  addOld: function(params, callback){
    var sql = "INSERT INTO old_student ( academic, student_id, name, major, s_year, roll_no, nrc_no, photo, gender, birthday, religion, nationality, address, phone_no, father_name, f_nrc, f_occupation, f_religion, f_nationality, mother_name, m_nrc, m_occupation, m_religion, m_nationality, high_school_success_year, high_school_roll_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    return db.query(sql, params, callback);
  },
  findByID: function(old_stuid, callback){
    console.log('findByID');
    var sql = "SELECT academic, old_stuid, student_id, name, major, s_year, roll_no, nrc_no, photo, gender, birthday, religion, nationality, address, phone_no, father_name, f_nrc, f_occupation, f_religion, f_nationality, mother_name, m_nrc, m_occupation, m_religion, m_nationality, high_school_success_year, high_school_roll_no, DATE_FORMAT(birthday, '%Y-%m-%d')AS birthday, DATE_FORMAT(high_school_success_year, '%Y-%m-%d')AS high_school_success_year FROM old_student WHERE old_stuid = ?";
    return db.query(sql, [old_stuid], callback);
  },
  update: function(params, callback) {
    console.log(params);
    var sql = "UPDATE old_student SET academic=?, student_id =?, name =?, major=?, s_year =?, roll_no =?, nrc_no =?, photo =?, gender =?, birthday =?, religion =?, nationality =?, address =?, phone_no =?, father_name =?, f_nrc =?, f_occupation =?, f_religion =?, f_nationality =?, mother_name =?, m_nrc =?, m_occupation =?, m_religion =?, m_nationality =?, high_school_success_year =?, high_school_roll_no =?, updated = NOW() WHERE old_stuid = ?";
    return db.query(sql, params, callback);
  },
  remove: function(old_stuid, callback) {
    var sql = "DELETE FROM old_student WHERE old_stuid = ?";
    return db.query(sql, [old_stuid], callback);
  },
  find: function(params, callback){
    var sql = "SELECT old_stuid, academic, student_id, name, major, s_year, roll_no, nrc_no, photo, gender, birthday, religion, nationality, address, phone_no, father_name, f_nrc, f_occupation, f_religion, f_nationality, mother_name, m_nrc, m_occupation, m_religion, m_nationality, high_school_success_year, high_school_roll_no, updated, DATE_FORMAT(birthday, '%Y-%m-%d')AS birthday, DATE_FORMAT(high_school_success_year, '%Y-%m-%d')AS high_school_success_year FROM old_student ";
    // if(params[0] != '')
    // sql += " WHERE name LIKE concat('%', ?, '%')";
    if(params[0] != undefined && params[1] != undefined) sql +="WHERE s_year = ? AND major = ?";
    return db.query(sql, params, callback);
  },
  compare: function(cleartext, encrypted){
    return bcrypt.compareSync(cleartext, encrypted);
  }
};

module.exports = Student;
