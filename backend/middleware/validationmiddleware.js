// backend/middleware/validationMiddleware.js
const Product = require('../models/Product');

// [VAL-BE-01], [VAL-BE-02], [VAL-BE-04] Validation Middleware
const validateProductInput = async (req, res, next) => {
  try {
    const { sku, name, price, quantity, lowStockThreshold } = req.body;
    const productId = req.params.id;

    // [VAL-BE-01] Validate core product fields
    if (!sku || typeof sku !== 'string' || sku.trim() === '') {
      return res.status(400).json({ success: false, message: 'SKU is required and must be a valid string.' });
    }
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ success: false, message: 'Name is required and must be a valid string.' });
    }
    if (price === undefined || typeof price !== 'number' || price < 0) {
      return res.status(400).json({ success: false, message: 'Price is required and must be greater than or equal to 0.' });
    }

    // [VAL-BE-02] Validate quantity and lowStockThreshold values
    if (quantity !== undefined && (typeof quantity !== 'number' || quantity < 0 || !Number.isInteger(quantity))) {
      return res.status(400).json({ success: false, message: 'Quantity must be an integer greater than or equal to 0.' });
    }
    if (lowStockThreshold !== undefined && (typeof lowStockThreshold !== 'number' || lowStockThreshold < 0 || !Number.isInteger(lowStockThreshold))) {
      return res.status(400).json({ success: false, message: 'Low stock threshold must be an integer greater than or equal to 0.' });
    }

    // [VAL-BE-04] Implement duplicate-product checking (SKU uniqueness check)
    const existingProduct = await Product.findOne({ sku: sku.trim() });
    if (existingProduct) {
      // If updating, ensure it doesn't conflict with another product's ID
      if (!productId || existingProduct._id.toString() !== productId) {
        return res.status(400).json({ success: false, message: `Product with SKU '${sku}' already exists.` });
      }
    }

    next();
  } catch (err) {
    next(err);
  }
};

const validateStockInput = (req, res, next) => {
  const { amount } = req.body;
  if (amount === undefined || typeof amount !== 'number' || amount <= 0 || !Number.isInteger(amount)) {
    return res.status(400).json({ success: false, message: 'Stock adjustment amount must be a positive integer.' });
  }
  next();
};

module.exports = { validateProductInput, validateStockInput };