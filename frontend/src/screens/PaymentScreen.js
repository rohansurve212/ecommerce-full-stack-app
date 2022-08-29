/** @format */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'

import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../features/cart/cartSlice'

const PaymentScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart)

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping')
    }
  }, [navigate, shippingAddress])

  const paymentMethodChangeHandler = (e) => {
    setPaymentMethod(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={paymentMethodChangeHandler}
            ></Form.Check>
            <h2> </h2>
            {/* <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={paymentMethodChangeHandler}
            ></Form.Check> */}
          </Col>
        </Form.Group>
        <h2> </h2>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}
export default PaymentScreen
