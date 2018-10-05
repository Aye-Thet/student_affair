var db = require('../dbconn');
var bcrypt = require('bcrypt-nodejs');

var Subject = {
  addSub: function(params, callback) {
    var sql = "INSERT INTO subject (sub_name, sub_code, major, s_year) VALUES (?, ?, ?, ?)";
    return db.query(sql, params, callback);
  },
  findByID: function(sub_id, callback) {
    var sql = "SELECT sub_id, sub_name, sub_code, major, s_year FROM subject WHERE sub_id = ?";
    return db.query(sql, [sub_id], callback);
  },
  update: function(params, callback) {
    var sql = "UPDATE subject SET sub_name =?, sub_code =?, major =?, s_year =?, updated = NOW() WHERE sub_id = ?";
    return db.query(sql, params, callback);
  },
  remove: function(sub_id, callback) {
    var sql = "DELETE FROM subject WHERE sub_id = ?";
    return db.query(sql, [sub_id], callback);
  },
  find: function(params, callback) {
    var sql = "SELECT sub_id, sub_name, sub_code, major, s_year FROM subject";
    sql += " WHERE sub_name LIKE concat('%', ?, '%')";
    return db.query(sql, params, callback);
  },
  findClass: function(params, callback){
    console.log('call',params);
    var sql = "SELECT sub_name FROM subject WHERE major =? AND s_year =?";
    return db.query(sql, params, callback);
  }
};

module.exports = Subject;
