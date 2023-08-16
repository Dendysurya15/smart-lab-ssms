const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',        // Your MySQL host
  user: 'root', // Your MySQL username
  password: '',             // Your MySQL password
  database: 'srsssmsc_smartlab', // Your MySQL database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default function handler(req, res) {
  // Query the users table
  pool.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ message: 'Error querying database' });
    } else {
      console.log('Queried users table successfully');
      res.status(200).json({ message: 'Queried users table successfully', users: results });
    }
  });
}
