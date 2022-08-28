/** @format */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../features/products/productListSlice'
import {
  deleteProduct,
  createProduct,
} from '../features/adminRights/adminRightsSlice'

const ProductListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { products, isLoading, isError, message } = useSelector(
    (state) => state.productList
  )

  const { deleteProductLoading, deleteProductError, deleteProductMessage } =
    useSelector((state) => state.adminRights)

  const {
    product: createdProduct,
    createProductLoading,
    createProductError,
    createProductMessage,
  } = useSelector((state) => state.adminRights)

  const { user: loggedInUser } = useSelector((state) => state.user)

  useEffect(() => {
    !loggedInUser
      ? navigate('/login')
      : loggedInUser.isAdmin
      ? dispatch(listProducts())
      : navigate('/')
  }, [dispatch, navigate, loggedInUser])

  const createProductHandler = () => {
    dispatch(createProduct())
    navigate(`/admin/product/${createdProduct._id}/edit`)
  }

  const deleteProductHandler = (productId) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(productId))
      dispatch(listProducts())
      window.location.reload()
    }
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {(deleteProductLoading || createProductLoading || isLoading) && (
        <Loader />
      )}
      {(deleteProductError && (
        <Message variant='danger'>{deleteProductMessage}</Message>
      )) ||
        (createProductError && (
          <Message variant='danger'>{createProductMessage}</Message>
        ))}
      {isError ? (
        <Message variant='danger'>{message}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>IN STOCK</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>$ {product.price}</td>
                <td>{product.countInStock}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteProductHandler(product._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}
export default ProductListScreen
