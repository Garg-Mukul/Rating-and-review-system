const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db'); // this will use your db.js

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Product routes
const productRoutes = require('./routes/products');
app.use('/products', productRoutes);


// Test route
app.get('/', (req, res) => {
  res.send('🎉 Ratings & Review System API is running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
