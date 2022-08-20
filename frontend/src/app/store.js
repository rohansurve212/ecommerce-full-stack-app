/** @format */

import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import productListReducer from '../features/products/productListSlice'
import cartReducer from '../features/cart/cartSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    productList: productListReducer,
    cart: cartReducer,
  },
})
