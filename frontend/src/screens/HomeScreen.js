/** @format */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts } from '../features/products/productListSlice'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const { products, isLoading, isError, message } = useSelector(
    (state) => state.productList
  )

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <h1>Latest Products</h1>
      {isError ? (
        <Message variant='danger'>{message}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
