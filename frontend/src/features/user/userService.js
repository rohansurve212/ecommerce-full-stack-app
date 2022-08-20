/** @format */

import axios from 'axios'

const API_URL = '/api/users/profile'

//Get user Profile
const getUserProfile = async (token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

//Update user Profile
const updateUserProfile = async (updatedUserData, token) => {
  const reqBody = updatedUserData
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL, reqBody, config)

  return response.data
}

const userService = {
  getUserProfile,
  updateUserProfile,
}

export default userService
