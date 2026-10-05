// backend/controllers/productController.js
import { Product } from '../models/Product.js';

export const createProduct = (req, res) => {
  const { sku, name, price, quantity, lowStockThreshold } = req.body;

  if (!sku || !name || price === undefined || quantity === undefined || lowStockThreshold === undefined) {
    return res.status(400).json({
      success: false,
      message: 'All product fields are required: sku, name, price, quantity, lowStockThreshold'
    });
  }

  const existingProduct = Product.findBySku(sku);
  if (existingProduct) {
    return res.status(409).json({
      success: false,
      message: `Product with SKU "${sku}" already exists`
    });
  }

  const newProduct = Product.create({ sku, name, price, quantity, lowStockThreshold });
  return res.status(201).json({
    success: true,
    data: newProduct
  });
};

export const getProducts = (req, res) => {
  const products = Product.findAll();
  return res.status(200).json({
    success: true,
    data: products
  });
};

export const getProductById = (req, res) => {
  const { id } = req.params;
  const product = Product.findById(id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Product with ID "${id}" not found`
    });
  }

  return res.status(200).json({
    success: true,
    data: product
  });
};

export const updateProduct = (req, res) => {
  const { id } = req.params;
  const existingProduct = Product.findById(id);

  if (!existingProduct) {
    return res.status(404).json({
      success: false,
      message: `Product with ID "${id}" not found`
    });
  }

  const updatedProduct = Product.update(id, req.body);
  return res.status(200).json({
    success: true,
    data: updatedProduct
  });
};