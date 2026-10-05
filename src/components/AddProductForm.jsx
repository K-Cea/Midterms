import React, { useState } from 'react';

export default function AddProductForm({ isOpen, onSubmit, onClose }) {
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [lowStockThreshold, setLowStockThreshold] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      sku,
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      lowStockThreshold: parseInt(lowStockThreshold, 10),
    });
    onClose();
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px 0' }}>
      <h3>Add Product Form (INV-FE-02)</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>SKU: </label>
          <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} required />
        </div>
        <div>
          <label>Name: </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Price: </label>
          <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <label>Quantity: </label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </div>
        <div>
          <label>Low Stock Threshold: </label>
          <input type="number" value={lowStockThreshold} onChange={(e) => setLowStockThreshold(e.target.value)} required />
        </div>
        <button type="submit">Add Product</button>
        <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>Cancel</button>
      </form>
    </div>
  );
}