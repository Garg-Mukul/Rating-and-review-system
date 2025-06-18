const mysql = require('mysql2');
require('dotenv').config();

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,     // e.g., 'localhost'
  user: process.env.DB_USER,     // your MySQL username, e.g., 'root'
  password: process.env.DB_PASSWORD,
 // your MySQL password
  database: process.env.DB_NAME  // database name, e.g., 'ratings_reviews_db'
});

// Attempt to connect
connection.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    return;
  }
  console.log('✅ Connected to MySQL database!');
});

// Export the connection to use in other files
module.exports = connection;
