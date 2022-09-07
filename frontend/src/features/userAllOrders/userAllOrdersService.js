/** @format */

import axios from 'axios'

const ORDER_API_URL = '/api/orders'

//Update order to paid
const getMyOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(`${ORDER_API_URL}/myorders`, config)

  return response.data
}

const userAllOrdersService = {
  getMyOrders,
}

export default userAllOrdersService
