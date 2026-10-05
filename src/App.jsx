import React, { useState, useEffect } from 'react';
import ProductTable from './components/ProductTable';
import AddProductForm from './components/AddProductForm';
import EditProductForm from './components/EditProductForm';
import { fetchProducts, createProduct, updateProduct, removeProduct } from './api';

function App() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load products when the app starts
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await fetchProducts();
      setProducts(data || []);
    } catch (error) {
      console.error('Failed to load products', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const savedProduct = await createProduct(newProduct);
      setProducts([...products, savedProduct]);
    } catch (error) {
      console.error('Failed to add product', error);
    }
  };

  const handleEditProduct = async (id, updates) => {
    try {
      const updated = await updateProduct(id, updates);
      setProducts(products.map(p => p.id === id ? updated : p));
    } catch (error) {
      console.error('Failed to update product', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await removeProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Failed to delete product', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Inventory Management System (INV-FE-05)</h1>
      
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
        isLoading={isLoading}
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