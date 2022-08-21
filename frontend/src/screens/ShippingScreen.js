/** @format */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../features/cart/cartSlice'

const ShippingScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart)

  const FORM_DATA_INITIAL_STATE = {
    streetAddress: shippingAddress ? shippingAddress.streetAddress : '',
    city: shippingAddress ? shippingAddress.city : '',
    postalCode: shippingAddress ? shippingAddress.postalCode : '',
    country: shippingAddress ? shippingAddress.country : '',
  }
  const [formData, setFormData] = useState(FORM_DATA_INITIAL_STATE)

  const { streetAddress, city, postalCode, country } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formDataChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(saveShippingAddress(formData))
    navigate('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='streetAddress'>
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter street address'
            name='streetAddress'
            value={streetAddress}
            onChange={formDataChangeHandler}
            required
          ></Form.Control>
        </Form.Group>
        <h2> </h2>
        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            name='city'
            value={city}
            onChange={formDataChangeHandler}
            required
          ></Form.Control>
        </Form.Group>
        <h2> </h2>
        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            name='postalCode'
            value={postalCode}
            onChange={formDataChangeHandler}
            required
          ></Form.Control>
        </Form.Group>
        <h2> </h2>
        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            name='country'
            value={country}
            onChange={formDataChangeHandler}
            required
          ></Form.Control>
        </Form.Group>
        <h2> </h2>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}
export default ShippingScreen
