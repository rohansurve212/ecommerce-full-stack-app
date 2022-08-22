/** @format */

import axios from 'axios'

const ORDER_API_URL = '/api/orders'

//Create a new order
const createOrder = async (orderData, token) => {
  const reqBody = orderData
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(ORDER_API_URL, reqBody, config)

  return response.data
}

//Get order by id
const getOrderDetails = async (orderId, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(`${ORDER_API_URL}/${orderId}`, config)

  return response.data
}

const orderService = {
  createOrder,
  getOrderDetails,
}

export default orderService
