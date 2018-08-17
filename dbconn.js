var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'user_STUaffair',
  password        : 'Ayethet107',
  database        : 'db_STUaffair'
});

module.exports = pool;
