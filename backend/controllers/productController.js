/** @format */

import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = parseInt(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
        $or: [
          {
            name: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          },
          {
            description: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          },
          {
            brand: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          },
        ],
      }
    : {}

  const count = await Product.count({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc   Fetch a product by Id
// @route  GET /api/products/:id
// @access Public
export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc   Create a product review
// @route  POST /api/products/:id/reviews
// @access Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )
    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }
    const review = {
      name: req.user.name,
      rating: parseFloat(rating),
      comment,
      user: req.user._id,
    }
    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating = (
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length
    ).toFixed(1)

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(400)
    throw new Error('Invalid review')
  }
})

// @desc   Delete a product review
// @route  DELETE /api/products/:id/reviews
// @access Private
export const deleteProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    try {
      product.reviews = product.reviews.filter(
        (r) => r.user.toString() !== req.user._id.toString()
      )
      await product.save()
      res.status(200).json({ message: 'Product review removed' })
    } catch (error) {
      res.status(404)
      throw new Error('Product review not found')
    }
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc   Get top rated products
// @route  GET /api/products/top-rated
// @access Public
export const getTopRatedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  if (products) {
    res.status(200).json(products)
  } else {
    res.status(400)
    throw new Error('Top-rated products not found')
  }
})

//---------------------* ADMINISTRATOR ACCESS ONLY *----------------------------

// @desc   Delete a product
// @route  DELETE /api/products/:id
// @access Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.status(200).json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc   Create a product
// @route  POST /api/products/
// @access Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample Name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdProduct = await product.save()

  if (createdProduct) {
    res.status(201).json(createdProduct)
  } else {
    res.status(400)
    throw new Error('Invalid product data')
  }
})

// @desc   Update a product
// @route  PUT /api/products/:id
// @access Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    countInStock,
    brand,
    category,
    rating,
    numReviews,
    reviews,
  } = await req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name || product.name
    product.price = price || product.price
    product.description = description || product.description
    product.image = image || product.image
    product.countInStock = countInStock || product.countInStock
    product.brand = brand || product.brand
    product.category = category || product.category
    product.rating = rating || product.rating
    product.numReviews = numReviews || product.numReviews
    product.reviews = reviews || product.reviews

    const updatedProduct = await product.save()

    res.status(200).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})
