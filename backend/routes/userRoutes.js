/** @format */

import express from 'express'

import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUserById,
} from '../controllers/userController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser).get(protect, isAdmin, getAllUsers)
router.route('/login').post(loginUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route('/:id')
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUserById)
  .delete(protect, isAdmin, deleteUser)

export default router
