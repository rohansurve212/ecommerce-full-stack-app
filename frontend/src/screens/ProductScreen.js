/** @format */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'

import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getProductDetails } from '../features/products/productListSlice'
import { addCartItem } from '../features/cart/cartSlice'

const ProductScreen = () => {
  const [quantity, setQuantity] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { product, isLoading, isError, message } = useSelector(
    (state) => state.productList
  )

  const { id } = useParams()

  useEffect(() => {
    dispatch(getProductDetails(id))
  }, [id, dispatch])

  const addToCartHandler = () => {
    const cartInput = {
      productId: id,
      productQty: quantity === 0 ? 1 : quantity,
    }
    dispatch(addCartItem(cartInput))
    navigate(`/cart/${cartInput.productId}?qty=${cartInput.productQty}`)
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      {isError ? (
        <Message variant='danger'>{message}</Message>
      ) : (
        <>
          <Link className='btn btn-outline-dark my-3' to='/'>
            Go Back
          </Link>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating ? product.rating : 0}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>{product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={quantity}
                            onChange={(e) => {
                              setQuantity(e.target.value)
                            }}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}
export default ProductScreen
