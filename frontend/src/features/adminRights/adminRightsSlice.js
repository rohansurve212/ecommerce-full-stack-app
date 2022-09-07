/** @format */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import adminRightsService from './adminRightsService'

const initialState = {
  users: [],
  user: {},
  orders: [],
  isLoading: false,
  isError: false,
  message: '',
  deleteProductLoading: false,
  deleteProductError: false,
  deleteProductMessage: '',
  createdProduct: { reviews: [] },
  createProductLoading: false,
  createProductSuccess: false,
  createProductError: false,
  createProductMessage: '',
  getAllOrdersLoading: false,
  getAllOrdersSuccess: false,
  getAllOrdersError: false,
  getAllOrdersMessage: '',
  updateOrderToShippedLoading: false,
  updateOrderToShippedSuccess: false,
  updateOrderToShippedError: false,
  updateOrderToShippedMessage: '',
}

//---------------------* User-related Thunk Functions *----------------------------

//Get all users
export const getAllUsers = createAsyncThunk(
  'adminRights/getAllUsers',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      return await adminRightsService.getAllUsers(token)
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Delete a user
export const deleteUser = createAsyncThunk(
  'adminRights/deleteUser',
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      return await adminRightsService.deleteUser(userId, token)
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Get a user by id
export const getUserById = createAsyncThunk(
  'adminRights/getUserById',
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      return await adminRightsService.getUserById(userId, token)
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Update a user by id
export const updateUserById = createAsyncThunk(
  'adminRights/updateUserById',
  async (updatedUserData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      return await adminRightsService.updateUserById(updatedUserData, token)
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//---------------------* Product-related Thunk Functions *----------------------------

//Delete a product
export const deleteProduct = createAsyncThunk(
  'adminRights/deleteProduct',
  async (productId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      return await adminRightsService.deleteProduct(productId, token)
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Create a product
export const createProduct = createAsyncThunk(
  'adminRights/createProduct',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      return await adminRightsService.createProduct(token)
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Update a product
export const updateProduct = createAsyncThunk(
  'adminRights/updateProduct',
  async (updatedProductData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      return await adminRightsService.updateProduct(updatedProductData, token)
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//---------------------* Order-related Thunk Functions *----------------------------

//Get all orders
export const getAllOrders = createAsyncThunk(
  'adminRights/getAllOrders',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      return await adminRightsService.getAllOrders(token)
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Update Order to shipped
export const updateOrderToShipped = createAsyncThunk(
  'adminRights/updateOrderToShipped',
  async (orderId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      return await adminRightsService.updateOrderToShipped(orderId, token)
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//------------------------------* Create Slice *-----------------------------------

export const adminRightsSlice = createSlice({
  name: 'adminRights',
  initialState,
  reducers: {
    deleteProductReset: (state) => {
      state.deleteProductLoading = false
      state.deleteProductError = false
      state.deleteProductMessage = ''
    },
    createProductReset: (state) => {
      state.createProductLoading = false
      state.createProductSuccess = false
      state.createProductError = false
      state.createProductMessage = ''
    },
    updateOrderToShippedReset: (state) => {
      state.updateOrderToShippedLoading = false
      state.updateOrderToShippedSuccess = false
      state.updateOrderToShippedError = false
      state.updateOrderToShippedMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateUserById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteProduct.pending, (state) => {
        state.deleteProductLoading = true
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleteProductLoading = false
        state.deleteProductMessage = action.payload
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteProductLoading = false
        state.isError = true
        state.deleteProductMessage = action.payload
      })
      .addCase(createProduct.pending, (state) => {
        state.createProductLoading = true
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.createProductLoading = false
        state.createProductSuccess = true
        state.createdProduct = action.payload
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.createProductLoading = false
        state.createProductError = true
        state.createProductMessage = action.payload
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.product = action.payload
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllOrders.pending, (state) => {
        state.getAllOrdersLoading = true
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.getAllOrdersLoading = false
        state.orders = action.payload
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.getAllOrdersLoading = false
        state.getAllOrdersError = true
        state.getAllOrdersMessage = action.payload
      })
      .addCase(updateOrderToShipped.pending, (state) => {
        state.updateOrderToShippedLoading = true
      })
      .addCase(updateOrderToShipped.fulfilled, (state, action) => {
        state.updateOrderToShippedLoading = false
        state.order = action.payload
      })
      .addCase(updateOrderToShipped.rejected, (state, action) => {
        state.updateOrderToShippedLoading = false
        state.updateOrderToShippedError = true
        state.updateOrderToShippedMessage = action.payload
      })
  },
})

export const {
  deleteProductReset,
  createProductReset,
  updateOrderToShippedReset,
} = adminRightsSlice.actions
export default adminRightsSlice.reducer
