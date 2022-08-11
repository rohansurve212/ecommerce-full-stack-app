/** @format */

import { configureStore } from '@reduxjs/toolkit'

import productListReducer from '../features/products/productListSlice'
import cartReducer from '../features/cart/cartSlice'

export const store = configureStore({
  reducer: {
    productList: productListReducer,
    cart: cartReducer,
  },
})
