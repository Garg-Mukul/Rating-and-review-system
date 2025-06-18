const API_URL = 'http://localhost:5000';

// Fetch and render products
async function loadProducts() {
  const res = await fetch(`${API_URL}/products`);
  const products = await res.json();

  const list = document.getElementById('product-list');
  list.innerHTML = '';

  const productSelect = document.getElementById('product-id');
  productSelect.innerHTML = '<option value="">-- Select a product --</option>';

  products.forEach(product => {
    // Add to product display list
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <strong>${product.name}</strong><br/>
      ${product.description}<br/>
      ⭐ Average Rating: ${Number(product.average_rating).toFixed(1)}<br/>
      📝 Total Ratings: ${product.total_ratings}
    `;
    list.appendChild(div);

    // Add to product dropdown
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = `${product.name} (ID: ${product.id})`;
    productSelect.appendChild(option);
  });
}

// Submit rating form
document.getElementById('rating-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const productId = document.getElementById('product-id').value;
  const userId = document.getElementById('user-id').value;
  const rating = document.getElementById('rating').value;

  if (!productId || !userId || !rating) {
    document.getElementById('message').innerText = 'All fields are required.';
    return;
  }

  const res = await fetch(`${API_URL}/products/${productId}/rate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user_id: userId, rating: rating })
  });

  const result = await res.json();
  document.getElementById('message').innerText = result.message || result.error;

  loadProducts(); // refresh product list
});

// Initial load
loadProducts();
