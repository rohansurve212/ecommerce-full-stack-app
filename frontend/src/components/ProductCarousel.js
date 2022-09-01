/** @format */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'

import Loader from './Loader'
import Message from './Message'
import { getTopRatedProducts } from '../features/products/productListSlice'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const {
    topRatedProducts,
    getTopRatedProductsLoading,
    getTopRatedProductsError,
    getTopRatedProductsMessage,
  } = useSelector((state) => state.productList)

  useEffect(() => {
    dispatch(getTopRatedProducts())
  }, [dispatch])

  return getTopRatedProductsLoading ? (
    <Loader />
  ) : getTopRatedProductsError ? (
    <Message variant='danger'>{getTopRatedProductsMessage}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {topRatedProducts.map((product, index) => (
        <Carousel.Item key={index}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} ({product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}
export default ProductCarousel
