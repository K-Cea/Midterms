// backend/routes/productRoutes.js
import { Router } from 'express';
import {
  createProduct,
  getProducts,
  getProductById
} from '../controllers/productController.js';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);

export default router;