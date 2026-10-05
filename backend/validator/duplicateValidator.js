// backend/validators/duplicateValidator.js
const Product = require('../models/Product');

const validateDuplicateProduct = async (req, res, next) => {
  try {
    const { sku } = req.body;
    const productId = req.params.id;

    if (sku) {
      const existingProduct = await Product.findOne({ sku: sku.trim() });
      if (existingProduct) {
        if (!productId || existingProduct._id.toString() !== productId) {
          return res.status(400).json({ success: false, message: `Product with SKU '${sku}' already exists.` });
        }
      }
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { validateDuplicateProduct };