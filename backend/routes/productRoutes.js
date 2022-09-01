/** @format */
import express from 'express'

import {
  getProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  deleteProductReview,
  getTopRatedProducts,
} from '../controllers/productController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, isAdmin, createProduct)
router.route('/top-rated').get(getTopRatedProducts)
router
  .route('/:id')
  .get(getProduct)
  .put(protect, isAdmin, updateProduct)
  .delete(protect, isAdmin, deleteProduct)

router
  .route('/:id/reviews')
  .post(protect, createProductReview)
  .delete(protect, deleteProductReview)

export default router
