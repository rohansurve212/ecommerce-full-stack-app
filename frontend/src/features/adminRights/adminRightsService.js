/** @format */

import axios from 'axios'

const USERS_API_URL = '/api/users'

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

const adminRightsService = {
  getAllUsers,
  deleteUser,
  getUserById,
  updateUserById,
}

export default adminRightsService
