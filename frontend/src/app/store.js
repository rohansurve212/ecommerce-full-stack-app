/** @format */

import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../features/user/userSlice'
import productListReducer from '../features/products/productListSlice'
import cartReducer from '../features/cart/cartSlice'
import orderReducer from '../features/order/orderSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    productList: productListReducer,
    cart: cartReducer,
    order: orderReducer,
  },
})
