// backend/routes/productRoutes.js
import { Router } from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct
} from '../controllers/productController.js';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);

export default router;