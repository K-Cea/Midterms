// backend/validators/quantityValidator.js
const validateQuantityValues = (req, res, next) => {
  const { quantity, lowStockThreshold } = req.body;

  if (quantity !== undefined && (typeof quantity !== 'number' || quantity < 0 || !Number.isInteger(quantity))) {
    return res.status(400).json({ success: false, message: 'Quantity must be an integer greater than or equal to 0.' });
  }
  if (lowStockThreshold !== undefined && (typeof lowStockThreshold !== 'number' || lowStockThreshold < 0 || !Number.isInteger(lowStockThreshold))) {
    return res.status(400).json({ success: false, message: 'Low stock threshold must be an integer greater than or equal to 0.' });
  }

  next();
};

module.exports = { validateQuantityValues };