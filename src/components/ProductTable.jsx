import React from 'react';

export default function ProductTable({ products = [], isLoading = false, onEdit, onDelete }) {
  if (isLoading) return <div>Loading...</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>SKU</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Low Stock Threshold</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.sku}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>{product.lowStockThreshold}</td>
            <td>
              <button onClick={() => onEdit(product)}>Edit</button>
              <button onClick={() => onDelete(product.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}