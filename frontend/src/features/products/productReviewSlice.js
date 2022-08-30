/** @format */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import productReviewService from './productReviewService'

const initialState = {
  productReviewLoading: false,
  productReviewSuccess: false,
  productReviewError: false,
  productReviewMessage: '',
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
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const productReviewSlice = createSlice({
  name: 'productReview',
  initialState,
  reducers: {
    productReviewReset: (state) => {
      state.productReviewLoading = false
      state.productReviewSuccess = false
      state.productReviewError = false
      state.productReviewMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProductReview.pending, (state) => {
        state.productReviewLoading = true
      })
      .addCase(createProductReview.fulfilled, (state, action) => {
        state.productReviewLoading = false
        state.productReviewSuccess = true
        state.productReviewMessage = action.payload
      })
      .addCase(createProductReview.rejected, (state, action) => {
        state.productReviewLoading = false
        state.productReviewError = true
        state.productReviewMessage = action.payload
      })
  },
})

export const { productReviewReset } = productReviewSlice.actions
export default productReviewSlice.reducer
