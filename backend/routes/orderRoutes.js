/** @format */

import express from 'express'

import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getAllOrders,
  updateOrderToShipped,
} from '../controllers/orderController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, createOrder).get(protect, isAdmin, getAllOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/ship').put(protect, isAdmin, updateOrderToShipped)

export default router
