const BASE_URL = 'http://localhost:5000/api/products';

export async function fetchProducts() {
  const response = await fetch(BASE_URL);
  const result = await response.json();
  return result.data;
}

export async function createProduct(productData) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  const result = await response.json();
  return result.data;
}

export async function updateProduct(id, productData) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  const result = await response.json();
  return result.data;
}

export async function removeProduct(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  const result = await response.json();
  return result.success;
}