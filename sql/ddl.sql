DROP SCHEMA db_STUaffair;
DROP USER 'user_STUaffair'@'localhost';

CREATE SCHEMA db_STUaffair CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE USER 'user_STUaffair'@'localhost' IDENTIFIED BY 'Ayethet107';
GRANT ALL PRIVILEGES ON db\_STUaffair.*TO 'user_STUaffair'@'localhost' WITH GRANT OPTION;

CREATE TABLE db_stuaffair.user (
  uid INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  email VARCHAR(128) NOT NULL,
  password VARCHAR(128) NOT NULL,
  repassword VARCHAR(128) NOT NULL,
  inserted DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  insertedby INT(11) NULL,
  updatedby INT(11) NULL,
  PRIMARY KEY (uid),
  UNIQUE INDEX uid_UNIQUE (uid ASC));
