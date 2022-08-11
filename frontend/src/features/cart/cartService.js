/** @format */

import axios from 'axios'

const API_URL = '/api/products'

//Create new shopping cart
const createCart = async (cartInput) => {}

//Add an item to cart
const addCartItem = async (cartInput, cartItems) => {
  const { data } = await axios.get(`${API_URL}/${cartInput.productId}`)

  const addedItem = {
    product: data._id,
    name: data.name,
    image: data.image,
    price: data.price,
    countInStock: data.countInStock,
    qty: parseInt(cartInput.productQty),
  }
  const existingItem = cartItems.find((x) => x.product === addedItem.product)

  if (existingItem) {
    cartItems = cartItems.map((x) =>
      x.product === existingItem.product ? addedItem : x
    )
    console.log(cartItems)
  } else {
    cartItems = [...cartItems, addedItem]
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems))

  return cartItems
}

//Remove an item from cart
const removeCartItem = async (cartInput) => {}

const cartService = {
  createCart,
  addCartItem,
  removeCartItem,
}

export default cartService
