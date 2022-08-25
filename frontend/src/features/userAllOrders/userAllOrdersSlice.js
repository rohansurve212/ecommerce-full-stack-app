/** @format */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import userAllOrdersService from './userAllOrdersService'

const initialState = {
  orders: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
}

//Get logged-in user's all orders
export const getMyOrders = createAsyncThunk(
  'userAllOrders/getMyOrders',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      return await userAllOrdersService.getMyOrders(token)
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

const userAllOrdersSlice = createSlice({
  name: 'userAllOrders',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orders = action.payload
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export default userAllOrdersSlice.reducer
