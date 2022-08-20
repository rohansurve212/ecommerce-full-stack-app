/** @format */

import axios from 'axios'

const API_URL = '/api/users'

//Register a new user
const register = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const response = await axios.post(API_URL, userData, config)

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

  const response = await axios.post(`${API_URL}/login`, userData, config)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  console.log(response.data)
  return response.data
}

//Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  login,
  logout,
}

export default authService
