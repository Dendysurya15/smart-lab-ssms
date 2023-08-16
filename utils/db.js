const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost', // Your MySQL host
  user: 'root', // Your MySQL username
  password: '', // Your MySQL password
  database: 'srsssmsc_smartlab', // Your MySQL database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();
