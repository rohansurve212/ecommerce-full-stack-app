/** @format */

import axios from 'axios'

const USERS_API_URL = '/api/users'
const PRODUCTS_API_URL = '/api/products'

//---------------------* User-related API Endpoints *----------------------------

//Get all users
const getAllUsers = async (token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(USERS_API_URL, config)

  return response.data
}

//Delete a user
const deleteUser = async (userId, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(`${USERS_API_URL}/${userId}`, config)

  return response.data.message
}

//Get a user by id
const getUserById = async (userId, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(`${USERS_API_URL}/${userId}`, config)

  return response.data
}

//Update a user by id
const updateUserById = async (updatedUserData, token) => {
  const reqBody = updatedUserData
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(
    `${USERS_API_URL}/${reqBody._id}`,
    reqBody,
    config
  )

  return response.data
}

//---------------------* Product-related API Endpoints *----------------------------

//Delete a product
const deleteProduct = async (productId, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(
    `${PRODUCTS_API_URL}/${productId}`,
    config
  )

  return response.data.message
}

//Create a product
const createProduct = async (token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(`${PRODUCTS_API_URL}`, {}, config)

  return response.data
}

//Update a product
const updateProduct = async (updatedProductData, token) => {
  const {
    _id,
    name,
    price,
    description,
    image,
    countInStock,
    brand,
    category,
  } = updatedProductData

  const reqBody = {
    _id,
    name,
    price: parseFloat(price),
    description,
    image,
    countInStock: parseInt(countInStock),
    brand,
    category,
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(
    `${PRODUCTS_API_URL}/${reqBody._id}`,
    reqBody,
    config
  )

  return response.data
}

const adminRightsService = {
  getAllUsers,
  deleteUser,
  getUserById,
  updateUserById,
  deleteProduct,
  createProduct,
  updateProduct,
}

export default adminRightsService
