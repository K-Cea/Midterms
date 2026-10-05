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

  const newProduct = Product.create({
    sku,
    name,
    price,
    quantity,
    lowStockThreshold
  });

  return res.status(201).json({
    success: true,
    data: newProduct
  });
};