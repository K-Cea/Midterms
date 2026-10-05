import React, { useState } from 'react';
import ProductTable from './components/ProductTable';
import AddProductForm from './components/AddProductForm';

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [products, setProducts] = useState([
    { id: 'prod_1', sku: 'SKU-1', name: 'Bolts', price: 4.5, quantity: 100, lowStockThreshold: 20 }
  ]);

  const handleAddProduct = (newProduct) => {
    const productWithId = { ...newProduct, id: 'prod_' + Date.now() };
    setProducts([...products, productWithId]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Inventory Management System</h1>
      
      <button onClick={() => setIsOpen(true)}>Open Add Product Form</button>

      <AddProductForm 
        isOpen={isOpen} 
        onSubmit={handleAddProduct} 
        onClose={() => setIsOpen(false)} 
      />

      <hr style={{ margin: '20px 0' }} />

      <ProductTable 
        products={products} 
        onEdit={(prod) => console.log('Edit', prod)} 
        onDelete={(id) => setProducts(products.filter(p => p.id !== id))} 
      />
    </div>
  );
}

export default App;