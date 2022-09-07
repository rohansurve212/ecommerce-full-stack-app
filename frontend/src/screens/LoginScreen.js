/** @format */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login, reset } from '../features/user/userSlice'

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  )
  const { cartItems } = useSelector((state) => state.cart)

  useEffect(() => {
    if (isSuccess && cartItems.length > 0) {
      navigate('/shipping')
      dispatch(reset())
    }

    if (isSuccess && cartItems.length === 0) {
      navigate('/')
      dispatch(reset())
    }
  }, [cartItems, isSuccess, navigate, dispatch])

  const formDataChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
    setFormData({
      email: '',
      password: '',
    })
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {isError && <Message variant='danger'>{message}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            name='email'
            value={email}
            onChange={formDataChangeHandler}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            name='password'
            value={password}
            onChange={formDataChangeHandler}
            autoComplete='on'
            required
          ></Form.Control>
        </Form.Group>
        <h2> </h2>
        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer? <Link to='/register'>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}
export default LoginScreen
