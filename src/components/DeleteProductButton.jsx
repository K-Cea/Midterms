import React from 'react';

export default function DeleteProductButton({ productId, onDelete }) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      onDelete(productId);
    }
  };

  return (
    <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
      Delete
    </button>
  );
}