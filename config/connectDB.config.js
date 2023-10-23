const oracledb = require("oracledb");

//! Connect database

const dbConfig = {
  user: "sys",
  password: "123456",
  connectString: "localhost:1521/orcl", // Ví dụ: 'localhost/XE' hoặc 'hostname:port/service_name'
  privilege: oracledb.SYSDBA,
};

module.exports = dbConfig
