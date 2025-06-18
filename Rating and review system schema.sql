-- Create database
CREATE DATABASE ratings_reviews_db;

-- Use the database
USE ratings_reviews_db;

-- Create users table
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(255)
);

-- Create products table
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  description TEXT
);

-- Create ratings table
CREATE TABLE ratings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  product_id INT,
  rating INT,
  UNIQUE KEY (user_id, product_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
