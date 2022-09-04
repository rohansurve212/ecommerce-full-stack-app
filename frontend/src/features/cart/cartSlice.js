/** @format */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import cartService from './cartService'

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : 'PayPal'

const initialState = {
  cartItems: cartItemsFromStorage,
  shippingAddress: shippingAddressFromStorage,
  paymentMethod: paymentMethodFromStorage,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
}

//Add item to the cart
export const addCartItem = createAsyncThunk(
  'cart/addItem',
  async (cartInput, thunkAPI) => {
    try {
      //const token = thunkAPI.getState().user.user?.token
      const cartItems = thunkAPI.getState().cart.cartItems
      return await cartService.addCartItem(cartInput, cartItems)
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Remove item from the cart
export const removeCartItem = createAsyncThunk(
  'cart/removeItem',
  async (productId, thunkAPI) => {
    try {
      //const token = thunkAPI.getState().user.user?.token
      const cartItems = thunkAPI.getState().cart.cartItems
      return await cartService.removeCartItem(productId, cartItems)
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Remove item from the cart
export const emptyCart = createAsyncThunk(
  'cart/emptyCart',
  async (thunkAPI) => {
    try {
      //const token = thunkAPI.getState().user.user?.token
      return await cartService.emptyCart()
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Save Shipping Address
export const saveShippingAddress = createAsyncThunk(
  'cart/saveAddress',
  async (addressData, thunkAPI) => {
    try {
      //const token = thunkAPI.getState().user.user?.token
      return await cartService.saveShippingAddress(addressData)
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Remove Shipping Address
export const removeShippingAddress = createAsyncThunk(
  'cart/removeAddress',
  async (thunkAPI) => {
    try {
      //const token = thunkAPI.getState().user.user?.token
      return await cartService.removeShippingAddress()
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Save Payment Method
export const savePaymentMethod = createAsyncThunk(
  'cart/savePaymentMethod',
  async (paymentMethod, thunkAPI) => {
    try {
      //const token = thunkAPI.getState().user.user?.token
      return await cartService.savePaymentMethod(paymentMethod)
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString()
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
        state.cartItems = action.payload
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(emptyCart.fulfilled, (state) => {
        state.cartItems = []
      })
      .addCase(saveShippingAddress.pending, (state) => {
        state.isLoading = true
      })
      .addCase(saveShippingAddress.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.shippingAddress = action.payload
      })
      .addCase(saveShippingAddress.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(removeShippingAddress.fulfilled, (state) => {
        state.shippingAddress = null
      })
      .addCase(savePaymentMethod.pending, (state) => {
        state.isLoading = true
      })
      .addCase(savePaymentMethod.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.paymentMethod = action.payload
      })
      .addCase(savePaymentMethod.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = cartSlice.actions
export default cartSlice.reducer
