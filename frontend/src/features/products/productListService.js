/** @format */

import axios from 'axios'

const API_URL = '/api/products'

//Get all products
const listProducts = async () => {
  const response = await axios.get(API_URL)

  return response.data
}

//Get product details for a single product
const getProductDetails = async (productId) => {
  const response = await axios.get(`${API_URL}/${productId}`)

  return response.data
}

const productListService = {
  listProducts,
  getProductDetails,
}

export default productListService
