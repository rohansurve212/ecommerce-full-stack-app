/** @format */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import adminRightsService from './adminRightsService'

const initialState = {
  users: [],
  user: {},
  isLoading: false,
  deleteUserSuccess: false,
  isError: false,
  message: '',
}

//Get all users
export const getAllUsers = createAsyncThunk(
  'adminRights/getAllUsers',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      return await adminRightsService.getAllUsers(token)
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

//Delete a user
export const deleteUser = createAsyncThunk(
  'adminRights/deleteUser',
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      return await adminRightsService.deleteUser(userId, token)
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

//Get a user by id
export const getUserById = createAsyncThunk(
  'adminRights/getUserById',
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      return await adminRightsService.getUserById(userId, token)
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

//Update a user by id
export const updateUserById = createAsyncThunk(
  'adminRights/updateUserById',
  async (updatedUserData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      return await adminRightsService.updateUserById(updatedUserData, token)
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

export const adminRightsSlice = createSlice({
  name: 'adminRights',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.deleteUserSuccess = false
      state.isError = false
      state.message = ''
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
        state.deleteUserSuccess = true
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
  },
})

export const { reset } = adminRightsSlice.actions
export default adminRightsSlice.reducer
