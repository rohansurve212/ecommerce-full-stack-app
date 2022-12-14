/** @format */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import productListService from './productListService'

const initialState = {
  products: [],
  topRatedProducts: [],
  pages: 1,
  page: 1,
  product: { reviews: [] },
  listProductsLoading: false,
  listProductsSuccess: false,
  listProductsError: false,
  listProductsMessage: '',
  getTopRatedProductsLoading: false,
  getTopRatedProductsSuccess: false,
  getTopRatedProductsError: false,
  getTopRatedProductsMessage: '',
  getProductDetailsLoading: false,
  getProductDetailsSuccess: false,
  getProductDetailsError: false,
  getProductDetailsMessage: '',
}

//Get a list of all products
export const listProducts = createAsyncThunk(
  'products/listAllProducts',
  async ({ keyword, pageNumber }, thunkAPI) => {
    try {
      return await productListService.listProducts({ keyword, pageNumber })
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Get top-rated products
export const getTopRatedProducts = createAsyncThunk(
  'products/getTopRatedProducts',
  async (_, thunkAPI) => {
    try {
      return await productListService.getTopRatedProducts()
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString()
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
        error.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    getProductDetailsReset: (state) => {
      state.getProductDetailsLoading = false
      state.getProductDetailsSuccess = false
      state.getProductDetailsError = false
      state.getProductDetailsMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listProducts.pending, (state) => {
        state.listProductsLoading = true
      })
      .addCase(listProducts.fulfilled, (state, action) => {
        state.listProductsLoading = false
        state.listProductsSuccess = true
        state.products = action.payload.products
        state.pages = action.payload.pages
        state.page = action.payload.page
      })
      .addCase(listProducts.rejected, (state, action) => {
        state.listProductsLoading = false
        state.listProductsError = true
        state.listProductsMessage = action.payload
      })
      .addCase(getTopRatedProducts.pending, (state) => {
        state.getTopRatedProductsLoading = true
      })
      .addCase(getTopRatedProducts.fulfilled, (state, action) => {
        state.getTopRatedProductsLoading = false
        state.getTopRatedProductsSuccess = true
        state.topRatedProducts = action.payload
      })
      .addCase(getTopRatedProducts.rejected, (state, action) => {
        state.getTopRatedProductsLoading = false
        state.getTopRatedProductsError = true
        state.getTopRatedProductsMessage = action.payload
      })
      .addCase(getProductDetails.pending, (state) => {
        state.getProductDetailsLoading = true
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.getProductDetailsLoading = false
        state.getProductDetailsSuccess = true
        state.product = action.payload
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.getProductDetailsLoading = false
        state.getProductDetailsError = true
        state.getProductDetailsMessage = action.payload
      })
  },
})

export const { getProductDetailsReset } = productListSlice.actions
export default productListSlice.reducer
