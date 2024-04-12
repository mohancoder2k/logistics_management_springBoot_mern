const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors'); // Import CORS module

const app = express();
const port = 5000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'register'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    throw err;
  }
  console.log('Connected to database');

  // Create the users table if it doesn't exist
  const createUserTable = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  )`;

  db.query(createUserTable, (err) => {
    if (err) {
      console.error('Error creating users table:', err);
      throw err;
    }
    console.log('Users table created or already exists');
  });
});

app.use(bodyParser.json());
app.use(cors()); // Use CORS middleware

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error('Registration error:', err);
      res.json({ success: false, error: err.message });
    } else {
      res.json({ success: true });
    }
  });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error('Login error:', err);
      res.json({ success: false, error: err.message });
    } else {
      if (result.length > 0) {
        res.json({ success: true });
      } else {
        res.json({ success: false, error: 'Invalid username or password' });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
