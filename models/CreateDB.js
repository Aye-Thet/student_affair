var db = require('../dbconn');
var bcrypt = require('bcrypt-nodejs');

var CreateDB = {
  generate: function(dbname, name, callback) {
    var sql = 'CREATE TABLE '+dbname+' (id INT NOT NUll AUTO_INCREMENT PRIMARY KEY, student_id INT(20) NOT NULL, sname VARCHAR(45) NOT NULL '+name+')';
    console.log(sql);
    return db.query(sql,[name],callback);
  },
  insertStu :function (dbName,list,callback) {
    var sql = 'INSERT INTO '+ dbName + ' (student_id, sname) VALUES ?';
    return db.query(sql,[list],callback);
  },
  findDB: function(dbName, callback) {
    var sql = 'SELECT * FROM '+ dbName + ' JOIN old_student ON old_student.student_id = '+dbName+'.student_id';
    return db.query(sql,[dbName],callback);
  },
  findDBList: function(dbName, callback) {
    var sql = 'SELECT * FROM '+ dbName + '';
    return db.query(sql,[dbName],callback);
  },
  findByID: function(dbName, callback) {
    var sql = 'SELECT * FROM '+ dbName + ' JOIN old_student ON old_student.student_id = '+dbName+'.student_id WHERE student_id =?';
    console.log(sql);
    return db.query(sql,callback);
  },
  findByIDone: function(dbName, student_id, callback) {
    var sql = 'SELECT old.student_id, old.name, old.roll_no, old.major, old.s_year FROM '+ dbName + ' JOIN old_student AS old ON old.student_id = '+dbName+'.student_id WHERE '+dbName+'.student_id ='+student_id+'';
    console.log(sql);
    return db.query(sql,[student_id],callback);
  },
  updateMark: function(dbName, subj, mark, student_id, callback) {
    console.log('calll');
    var sql = 'UPDATE '+dbName+' SET '+subj+' = '+mark+' WHERE student_id = '+student_id+'';
    console.log(sql);
    return db.query(sql, [subj], callback);
  }
}

module.exports = CreateDB;
