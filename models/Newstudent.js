var db = require('../dbconn');
var bcrypt = require('bcrypt-nodejs');

var Newstudent = {
  addNew: function(params, callback) {
    var sql = "INSERT INTO new_student ( academic, student_id, name, nrc_no, photo, gender, birthday, religion, nationality, address, phone_no, father_name, f_nrc, f_occupation, f_religion, f_nationality, mother_name, m_nrc, m_occupation, m_religion, m_nationality, high_school_name, high_school_success_year, high_school_roll_no, high_school_total_mark, high_school_subject_mark, examiner_dep, health_rec, police_rec) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    return db.query(sql, params, callback);
  },
  findByID: function(new_stuid, callback) {
    var sql = "SELECT new_stuid, academic, student_id, name, nrc_no, photo, gender, birthday, religion, nationality, address, phone_no, father_name, f_nrc, f_occupation, f_religion, f_nationality, mother_name, m_nrc, m_occupation, m_religion, m_nationality, high_school_name, high_school_success_year, high_school_roll_no, high_school_total_mark, high_school_subject_mark, examiner_dep, health_rec, police_rec, DATE_FORMAT(birthday, '%d-%m-%Y')AS birthday, DATE_FORMAT(high_school_success_year, '%d-%m-%Y')AS high_school_success_year FROM new_student WHERE new_stuid = ?";
    return db.query(sql, [new_stuid], callback);
  },
  update: function(params, callback) {
    var sql = "UPDATE new_student SET academic=?, student_id =?, name =?, nrc_no =?, photo =?, gender =?, birthday =?, religion =?, nationality =?, address =?, phone_no =?, father_name =?, f_nrc =?, f_occupation =?, f_religion =?, f_nationality =?, mother_name =?, m_nrc =?, m_occupation =?, m_religion =?, m_nationality =?, high_school_name =?, high_school_success_year =?, high_school_roll_no =?, high_school_total_mark =?, high_school_subject_mark =?, examiner_dep =?, health_rec =?, police_rec =?, updated = NOW() WHERE new_stuid = ?";
    return db.query(sql, params, callback);
  },
  remove: function(new_stuid, callback) {
    var sql = "DELETE FROM new_student WHERE new_stuid = ?";
    return db.query(sql, [new_stuid], callback);
  },
  find: function(params, callback) {
    var sql = "SELECT academic, new_stuid, student_id, name, nrc_no, photo, gender, birthday, religion, nationality, address, phone_no, father_name, f_nrc, f_occupation, f_religion, f_nationality, mother_name, m_nrc, m_occupation, m_religion, m_nationality, high_school_name, high_school_success_year, high_school_roll_no, high_school_total_mark, high_school_subject_mark, examiner_dep, health_rec, police_rec, DATE_FORMAT(birthday, '%d-%m-%Y')AS birthday, DATE_FORMAT(high_school_success_year, '%d-%m-%Y')AS high_school_success_year FROM new_student";
    if(params[0] != '')
    sql += " WHERE name LIKE concat('%', ?, '%')";
    return db.query(sql, params, callback);
  },
  compare: function(cleartext, encrypted){
    return bcrypt.compareSync(cleartext, encrypted);
  }
};

module.exports = Newstudent;
