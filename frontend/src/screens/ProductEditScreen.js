/** @format */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getProductDetails } from '../features/products/productListSlice'
import { updateProduct } from '../features/adminRights/adminRightsSlice'

const ProductEditScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id: productId } = useParams()

  const { user: loggedInUser } = useSelector((state) => state.user)

  const {
    product,
    getProductDetailsLoading,
    getProductDetailsError,
    getProductDetailsMessage,
  } = useSelector((state) => state.productList)

  const FORM_DATA_INITIAL_STATE = {
    name: '',
    price: 0,
    description: '',
    image: '',
    countInStock: 0,
    brand: '',
    category: '',
  }
  const [formData, setFormData] = useState(FORM_DATA_INITIAL_STATE)

  const { name, price, description, image, countInStock, brand, category } =
    formData

  useEffect(() => {
    !loggedInUser
      ? navigate('/login')
      : loggedInUser.isAdmin
      ? dispatch(getProductDetails(productId))
      : navigate('/')

    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      countInStock: product.countInStock,
      brand: product.brand,
      category: product.category,
    })
  }, [
    dispatch,
    navigate,
    loggedInUser,
    productId,
    product.name,
    product.price,
    product.description,
    product.image,
    product.countInStock,
    product.brand,
    product.category,
  ])

  const formDataChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const updatedProductData = {
      _id: productId,
      name,
      price,
      description,
      image,
      countInStock,
      brand,
      category,
    }

    console.log(updatedProductData)

    dispatch(updateProduct(updatedProductData))
    navigate('/admin/productlist')
    window.location.reload()
  }

  const backButtonHandler = () => {
    navigate('/admin/productlist')
  }

  if (getProductDetailsLoading) {
    return <Loader />
  }

  return (
    <>
      <FormContainer>
        <h1>Edit Product</h1>
        {getProductDetailsError ? (
          <Message variant='danger'>{getProductDetailsMessage}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                name='name'
                value={name}
                onChange={formDataChangeHandler}
              ></Form.Control>
            </Form.Group>
            <h2> </h2>
            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                name='price'
                value={price}
                onChange={formDataChangeHandler}
              ></Form.Control>
            </Form.Group>
            <h2> </h2>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                name='image'
                value={image}
                onChange={formDataChangeHandler}
              ></Form.Control>
            </Form.Group>
            <h2> </h2>
            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                name='brand'
                value={brand}
                onChange={formDataChangeHandler}
              ></Form.Control>
            </Form.Group>
            <h2> </h2>
            <Form.Group controlId='countInStock'>
              <Form.Label>In Stock</Form.Label>
              <Form.Control
                type='number'
                name='countInStock'
                value={countInStock}
                onChange={formDataChangeHandler}
              ></Form.Control>
            </Form.Group>
            <h2> </h2>
            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                name='category'
                value={category}
                onChange={formDataChangeHandler}
              ></Form.Control>
            </Form.Group>
            <h2> </h2>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                name='description'
                value={description}
                onChange={formDataChangeHandler}
              ></Form.Control>
            </Form.Group>
            <h2> </h2>
            <Button type='submit' variant='primary'>
              Update
            </Button>{' '}
            <Button
              variant='primary'
              className='btn btn-light my-3'
              onClick={backButtonHandler}
            >
              Go Back
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}
export default ProductEditScreen
