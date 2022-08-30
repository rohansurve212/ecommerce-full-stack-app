/** @format */

import axios from 'axios'

const API_URL = '/api/products'

//Create a product review
const createProductReview = async (productReviewData, token) => {
  const reqBody = productReviewData
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(
    `${API_URL}/${reqBody.productId}/reviews`,
    reqBody,
    config
  )

  return response.data.message
}

const productReviewService = {
  createProductReview,
}

export default productReviewService
