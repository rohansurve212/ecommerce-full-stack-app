/** @format */
import { useState, useEffect } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getOrderDetails,
  updateOrderToPaid,
  reset,
} from '../features/order/orderSlice'
import { store } from '../app/store'

const OrderScreen = () => {
  const dispatch = useDispatch()

  const { id } = useParams()
  const orderId = id

  const customerName = store.getState().user.user.name
  const customerEmail = store.getState().user.user.email

  const { order, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.order
  )

  const [sdkReady, setSdkReady] = useState(false)

  useEffect(() => {
    console.log('HELLO')
    dispatch(getOrderDetails(orderId))
  }, [dispatch, orderId])

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (isSuccess) {
      dispatch(reset())
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, isSuccess, order.isPaid])

  const paymentSuccessHandler = (paymentResult) => {
    const paymentData = {
      orderId,
      paymentResult,
    }
    dispatch(updateOrderToPaid(paymentData))
  }

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Message variant='danger'>{message}</Message>
  ) : (
    <>
      <h1>Order {orderId}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {customerName}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${customerEmail}`}>{customerEmail}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress?.streetAddress},{' '}
                {order.shippingAddress?.city}{' '}
                {order.shippingAddress?.postalCode},{' '}
                {order.shippingAddress?.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order?.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems?.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems?.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>$ {order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>$ {order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>$ {order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>$ {order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {isLoading && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={paymentSuccessHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}
export default OrderScreen
