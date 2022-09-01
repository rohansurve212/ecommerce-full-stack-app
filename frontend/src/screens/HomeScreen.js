/** @format */
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import { listProducts } from '../features/products/productListSlice'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const keyword = useParams().keyword || ''
  const pageNumber = useParams().pageNumber || 1

  const { products, pages, page, isLoading, isError, message } = useSelector(
    (state) => state.productList
  )

  useEffect(() => {
    dispatch(listProducts({ keyword, pageNumber }))
  }, [dispatch, keyword, pageNumber])

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      {isError ? (
        <Message variant='danger'>{message}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
