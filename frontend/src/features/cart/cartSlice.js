/** @format */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import cartService from './cartService'

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const initialState = {
  cartItems: cartItemsFromStorage,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
}

//Create new shopping cart
export const createCart = createAsyncThunk(
  'cart/create',
  async (cartInput, thunkAPI) => {
    try {
      //const token = thunkAPI.getState().auth.user?.token
      return await cartService.createCart(cartInput)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Add item to the cart
export const addCartItem = createAsyncThunk(
  'cart/addItem',
  async (cartInput, thunkAPI) => {
    try {
      //const token = thunkAPI.getState().auth.user?.token
      const cartItems = thunkAPI.getState().cart.cartItems
      return await cartService.addCartItem(cartInput, cartItems)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Remove item from the cart
export const removeCartItem = createAsyncThunk(
  'cart/removeItem',
  async (cartInput, thunkAPI) => {
    try {
      //const token = thunkAPI.getState().auth.user?.token
      return await cartService.removeCartItem(cartInput)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cartItems.push(action.payload)
      })
      .addCase(createCart.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addCartItem.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cartItems = action.payload
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(removeCartItem.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cartItems.pop(action.payload)
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = cartSlice.actions
export default cartSlice.reducer
