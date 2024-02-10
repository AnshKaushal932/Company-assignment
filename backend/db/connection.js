// db/connection.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'sql6.freesqldatabase.com',
  user: 'sql6683086',
  password: 'fTMhulHnKf',
  database: 'sql6683086'
});

module.exports = connection;
