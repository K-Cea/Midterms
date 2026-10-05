import React, { useState, useEffect } from 'react';

export default function EditProductForm({ product, isOpen, onSubmit, onClose }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [lowStockThreshold, setLowStockThreshold] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setPrice(product.price || '');
      setQuantity(product.quantity || '');
      setLowStockThreshold(product.lowStockThreshold || '');
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product.id, {
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      lowStockThreshold: parseInt(lowStockThreshold, 10),
    });
    onClose();
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px 0' }}>
      <h3>Edit Product Form (INV-FE-03)</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>SKU (Read-only): </label>
          <input type="text" value={product.sku || ''} disabled />
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
        <button type="submit">Update Product</button>
        <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>Cancel</button>
      </form>
    </div>
  );
}