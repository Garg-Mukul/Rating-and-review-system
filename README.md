Ratings & Review System

Project Structure
backend: Node.js + Express backend
frontend: Vanilla JS + HTML/CSS frontend
schema: Database schema and ER diagram
Setup Instructions
Backend
1. Run npm install
2. Create .env and configure DB credentials
3. Run node index.js
Frontend
1. Open frontend/index.html in browser (or use Live Server)

Database
Run SQL in schema/schema.sql to create tables
Add some sample users/products

Features:
Submit & fetch ratings
See average & total ratings
Prevent duplicate ratings

API Endpoints
- `GET /products`
- `POST /products/:id/rate`

