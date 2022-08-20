/** @format */

import axios from 'axios'

const AUTH_API_URL = '/api/users'
const PROFILE_API_URL = '/api/users/profile'

//Register a new user
const register = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const response = await axios.post(AUTH_API_URL, userData, config)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

//Login user
const login = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const response = await axios.post(`${AUTH_API_URL}/login`, userData, config)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

//Logout user
const logout = () => {
  localStorage.removeItem('user')
}

//Get user Profile
const getUserProfile = async (token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(PROFILE_API_URL, config)

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

  const response = await axios.put(PROFILE_API_URL, reqBody, config)

  return response.data
}

const userService = {
  register,
  login,
  logout,
  getUserProfile,
  updateUserProfile,
}

export default userService
