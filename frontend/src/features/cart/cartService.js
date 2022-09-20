/** @format */

import axios from 'axios'

const API_URL = '/api/products'

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
const removeCartItem = async (productId, cartItems) => {
  const existingItem = cartItems.find((x) => x.product === productId)

  if (existingItem) {
    cartItems = cartItems.filter((x) => x.product !== existingItem.product)
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems))

  return cartItems
}

//Empty Shopping Cart
const emptyCart = async () => {
  localStorage.removeItem('cartItems')
}

//Save shipping Address
const saveShippingAddress = async (addressData) => {
  localStorage.setItem('shippingAddress', JSON.stringify(addressData))

  return addressData
}

//Remove shipping Address
const removeShippingAddress = async () => {
  localStorage.removeItem('shippingAddress')
}

//Save payment Method
const savePaymentMethod = async (paymentMethod) => {
  localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))

  return paymentMethod
}

const cartService = {
  addCartItem,
  removeCartItem,
  emptyCart,
  saveShippingAddress,
  removeShippingAddress,
  savePaymentMethod,
}

export default cartService
