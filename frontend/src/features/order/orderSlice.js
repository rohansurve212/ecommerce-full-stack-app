/** @format */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import orderService from './orderService'

const initialState = {
  order: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
}

//Create a new order
export const createOrder = createAsyncThunk(
  'order/create',
  async (orderData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      return await orderService.createOrder(orderData, token)
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

//Get Order details
export const getOrderDetails = createAsyncThunk(
  'order/getOrderDetails',
  async (orderId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      return await orderService.getOrderDetails(orderId, token)
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

//Update Order to paid
export const updateOrderToPaid = createAsyncThunk(
  'order/updateOrderToPaid',
  async (paymentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      return await orderService.updateOrderToPaid(paymentData, token)
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

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.order = action.payload
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.order = {}
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.order = action.payload
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.order = {}
      })
      .addCase(updateOrderToPaid.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateOrderToPaid.fulfilled, (state, action) => {
        state.isLoading = false
        state.order = action.payload
      })
      .addCase(updateOrderToPaid.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = orderSlice.actions
export default orderSlice.reducer
