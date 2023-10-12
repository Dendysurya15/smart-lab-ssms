import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';

// ...

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { username, password } = req.body;

  const connection = await mysql.createConnection({
    // Your database configuration
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'srsssmsc_smartlab', // Your database name
  });

  try {
    await connection.query('SET SESSION sql_mode = "";'); // Disable strict mode

    const [rows] = await connection.query(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    );

    if (rows.length === 1) {
      const user = rows[0];
      // Create a JWT with user information
      const token = jwt.sign({ userId: user.id, username: user.username }, 'your-secret-key');

      // Successful login, send the token in response
      res.status(200).json({ token });
    } else {
      // Login failed
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    connection.end(); // Close the database connection
  }
}
