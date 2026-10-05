// backend/validators/productFieldValidator.js
const validateProductFields = (req, res, next) => {
  const { sku, name, price } = req.body;

  if (!sku || typeof sku !== 'string' || sku.trim() === '') {
    return res.status(400).json({ success: false, message: 'SKU is required and must be a valid string.' });
  }
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ success: false, message: 'Name is required and must be a valid string.' });
  }
  if (price === undefined || typeof price !== 'number' || price < 0) {
    return res.status(400).json({ success: false, message: 'Price is required and must be greater than or equal to 0.' });
  }

  next();
};

module.exports = { validateProductFields };