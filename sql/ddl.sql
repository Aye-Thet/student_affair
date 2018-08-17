DROP SCHEMA db_STUaffair;
DROP USER 'user_STUaffair'@'localhost';

CREATE SCHEMA db_STUaffair CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE USER 'user_STUaffair'@'localhost' IDENTIFIED BY 'Ayethet107';
GRANT ALL PRIVILEGES ON db\_STUaffair.*TO 'user_STUaffair'@'localhost' WITH GRANT OPTION;

CREATE TABLE db_stuaffair.user (
  user_id INT NOT NULL,
  name VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  password VARCHAR(45) NOT NULL,
  role VARCHAR(5) NOT NULL DEFAULT 'USER',
  inserted DATETIME NOT NULL DEFAULT 'CURRENT TIMESTAMP',
  updated DATETIME NOT NULL DEFAULT 'CURRENT TIMESTAMP',
  insertedby DATETIME NOT NULL,
  updatedby DATETIME NOT NULL,
  PRIMARY KEY (user_id),
  UNIQUE INDEX email_UNIQUE (email ASC));
