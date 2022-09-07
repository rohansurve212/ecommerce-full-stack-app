/** @format */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import productReviewService from './productReviewService'

const initialState = {
  createProductReviewLoading: false,
  createProductReviewSuccess: false,
  createProductReviewError: false,
  createProductReviewMessage: '',
  deleteProductReviewLoading: false,
  deleteProductReviewSuccess: false,
  deleteProductReviewError: false,
  deleteProductReviewMessage: '',
}

//Create a product review
export const createProductReview = createAsyncThunk(
  'productReview/createProductReview',
  async (productReviewData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      return await productReviewService.createProductReview(
        productReviewData,
        token
      )
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Delete a product review
export const deleteProductReview = createAsyncThunk(
  'productReview/deleteProductReview',
  async (productId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      return await productReviewService.deleteProductReview(productId, token)
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const productReviewSlice = createSlice({
  name: 'productReview',
  initialState,
  reducers: {
    createProductReviewReset: (state) => {
      state.createProductReviewLoading = false
      state.createProductReviewSuccess = false
      state.createProductReviewError = false
      state.createProductReviewMessage = ''
    },
    deleteProductReviewReset: (state) => {
      state.deleteProductReviewLoading = false
      state.deleteProductReviewSuccess = false
      state.deleteProductReviewError = false
      state.deleteProductReviewMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProductReview.pending, (state) => {
        state.createProductReviewLoading = true
      })
      .addCase(createProductReview.fulfilled, (state, action) => {
        state.createProductReviewLoading = false
        state.createProductReviewSuccess = true
        state.createProductReviewMessage = action.payload
      })
      .addCase(createProductReview.rejected, (state, action) => {
        state.createProductReviewLoading = false
        state.createProductReviewError = true
        state.createProductReviewMessage = action.payload
      })
      .addCase(deleteProductReview.pending, (state) => {
        state.deleteProductReviewLoading = true
      })
      .addCase(deleteProductReview.fulfilled, (state, action) => {
        state.deleteProductReviewLoading = false
        state.deleteProductReviewSuccess = true
        state.deleteProductReviewMessage = action.payload
      })
      .addCase(deleteProductReview.rejected, (state, action) => {
        state.deleteProductReviewLoading = false
        state.deleteProductReviewError = true
        state.deleteProductReviewMessage = action.payload
      })
  },
})

export const { createProductReviewReset, deleteProductReviewReset } =
  productReviewSlice.actions
export default productReviewSlice.reducer
