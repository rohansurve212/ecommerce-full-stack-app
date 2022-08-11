/** @format */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import productListService from './productListService'

const initialState = {
  products: [],
  product: { reviews: [] },
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
}

//Get a list of all products
export const listProducts = createAsyncThunk(
  'products/getAll',
  async (_, thunkAPI) => {
    try {
      return await productListService.listProducts()
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

//Get product details for a single product
export const getProductDetails = createAsyncThunk(
  'products/getProductDetails',
  async (productId, thunkAPI) => {
    try {
      return await productListService.getProductDetails(productId)
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

export const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(listProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.products = action.payload
      })
      .addCase(listProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getProductDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.product = action.payload
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export default productListSlice.reducer
