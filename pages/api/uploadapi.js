const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',        // Your MySQL host
  user: 'root',             // Your MySQL username
  password: '',             // Your MySQL password
  database: 'srsssmsc_smartlab', // Your MySQL database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      pool.query('SELECT * FROM track_sample', (err, results) => {
        if (err) {
          console.error('Error querying database:', err);
          res.status(500).json({ message: 'Error querying database' });
        } else {
          const { sqlInsertStatement } = req.body;

          // Ensure that sqlInsertStatement is not empty or invalid
          if (!sqlInsertStatement) {
            return res.status(400).json({ error: 'Invalid SQL statement' });
          }

          // Execute the SQL insert statement using the connection pool
          pool.query(sqlInsertStatement, (err, result) => {
            if (err) {
              console.error('Error executing SQL statement:', err);
              return res.status(500).json({ error: 'An error occurred while processing the request' });
            }
            return res.status(200).json({ message: 'Data inserted successfully', result });
          });
        }
      });
    } catch (error) {
      console.error('Error executing SQL statement:', error);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
