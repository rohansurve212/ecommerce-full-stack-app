/** @format */

import axios from 'axios'

const API_URL = '/api/products'

//Get all products
const listProducts = async ({ keyword, pageNumber }) => {
  const response = await axios.get(
    `${API_URL}?keyword=${keyword}&pageNumber=${pageNumber}`
  )

  return response.data
}

//Get top-rated products
const getTopRatedProducts = async () => {
  const response = await axios.get(`${API_URL}/top-rated`)

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
  getTopRatedProducts,
}

export default productListService
