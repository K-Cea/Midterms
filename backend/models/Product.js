// backend/models/Product.js
import crypto from 'node:crypto';

// In-memory mock storage pre-seeded to unblock testing immediately
const initialSeed = [
  {
    id: 'prod_1',
    sku: 'SKU-WDG-01',
    name: 'Industrial Widget',
    price: 24.99,
    quantity: 15,
    lowStockThreshold: 5
  },
  {
    id: 'prod_2',
    sku: 'SKU-BLT-02',
    name: 'Hex Bolts (100pk)',
    price: 4.50,
    quantity: 3,
    lowStockThreshold: 10
  }
];

class ProductStore {
  constructor() {
    this.products = [...initialSeed];
  }

  findAll() {
    return this.products;
  }

  findById(id) {
    return this.products.find((p) => p.id === id) || null;
  }

  findBySku(sku) {
    return this.products.find((p) => p.sku === sku) || null;
  }

  create({ sku, name, price, quantity, lowStockThreshold }) {
    const newProduct = {
      id: `prod_${crypto.randomUUID().slice(0, 8)}`,
      sku: String(sku).trim(),
      name: String(name).trim(),
      price: Number(price),
      quantity: Number(quantity),
      lowStockThreshold: Number(lowStockThreshold)
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id, updates) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const current = this.products[index];
    const updatedProduct = {
      ...current,
      ...(updates.name !== undefined && { name: String(updates.name).trim() }),
      ...(updates.price !== undefined && { price: Number(updates.price) }),
      ...(updates.quantity !== undefined && { quantity: Number(updates.quantity) }),
      ...(updates.lowStockThreshold !== undefined && { lowStockThreshold: Number(updates.lowStockThreshold) })
    };

    this.products[index] = updatedProduct;
    return updatedProduct;
  }

  delete(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return false;
    this.products.splice(index, 1);
    return true;
  }

  reset() {
    this.products = [...initialSeed];
  }
}

export const Product = new ProductStore();