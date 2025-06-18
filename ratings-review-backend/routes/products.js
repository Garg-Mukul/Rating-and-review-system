const express = require('express');
const router = express.Router();
const db = require('../db');

// ✅ GET /products - fetch all products with average rating and total number of ratings
router.get('/', (req, res) => {
  const query = `
    SELECT 
      p.id, p.name, p.description,
      IFNULL(AVG(r.rating), 0) AS average_rating,
      COUNT(r.rating) AS total_ratings
    FROM products p
    LEFT JOIN ratings r ON p.id = r.product_id
    GROUP BY p.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err.message);
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
    res.json(results);
  });
});

// ✅ POST /products/:id/rate - Submit a rating
router.post('/:id/rate', (req, res) => {
  const productId = req.params.id;
  const { user_id, rating } = req.body;

  if (!user_id || !rating) {
    return res.status(400).json({ message: 'User ID and rating are required.' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
  }

  const query = `
    INSERT INTO ratings (user_id, product_id, rating)
    VALUES (?, ?, ?)
  `;

  db.query(query, [user_id, productId, rating], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'User has already rated this product.' });
      }
      return res.status(500).json({ message: 'Error inserting rating', error: err.message });
    }
    res.status(201).json({ message: 'Rating submitted successfully.' });
  });
});

module.exports = router;
