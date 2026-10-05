import React, { useState } from 'react';
import ProductTable from './components/ProductTable';
import AddProductForm from './components/AddProductForm';
import EditProductForm from './components/EditProductForm';

function App() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([
    { id: 'prod_1', sku: 'SKU-1', name: 'Bolts', price: 4.5, quantity: 100, lowStockThreshold: 20 }
  ]);

  const handleAddProduct = (newProduct) => {
    const productWithId = { ...newProduct, id: 'prod_' + Date.now() };
    setProducts([...products, productWithId]);
  };

  const handleEditProduct = (id, updates) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Inventory Management System (INV-FE-04)</h1>
      
      <button onClick={() => setIsAddOpen(true)}>Add New Product</button>

      <AddProductForm 
        isOpen={isAddOpen} 
        onSubmit={handleAddProduct} 
        onClose={() => setIsAddOpen(false)} 
      />

      <EditProductForm 
        isOpen={isEditOpen}
        product={selectedProduct}
        onSubmit={handleEditProduct}
        onClose={() => setIsEditOpen(false)}
      />

      <hr style={{ margin: '20px 0' }} />

      <ProductTable 
        products={products} 
        onEdit={(prod) => {
          setSelectedProduct(prod);
          setIsEditOpen(true);
        }} 
        onDelete={handleDeleteProduct} 
      />
    </div>
  );
}

export default App;