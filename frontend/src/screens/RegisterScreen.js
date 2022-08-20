/** @format */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register, reset } from '../features/auth/authSlice'

const RegisterScreen = () => {
  const FORM_DATA_INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    registerErrorMessage: null,
  }
  const [formData, setFormData] = useState(FORM_DATA_INITIAL_STATE)

  const { name, email, password, confirmPassword, registerErrorMessage } =
    formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isSuccess) {
      navigate('/')
      dispatch(reset())
    }
  }, [isSuccess, navigate, dispatch])

  const formDataChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(reset())

    if (password !== confirmPassword) {
      setFormData((prevState) => ({
        ...prevState,
        registerErrorMessage: 'Passwords do not match',
      }))
    } else {
      const userData = {
        name,
        email,
        password,
        confirmPassword,
      }

      dispatch(register(userData))
      setFormData(FORM_DATA_INITIAL_STATE)
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {registerErrorMessage && (
        <Message variant='danger'>{registerErrorMessage}</Message>
      )}
      {isError && <Message variant='danger'>{message}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            name='name'
            value={name}
            onChange={formDataChangeHandler}
            required
          ></Form.Control>
        </Form.Group>
        <h2> </h2>
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
        <h2> </h2>
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
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={formDataChangeHandler}
            autoComplete='on'
            required
          ></Form.Control>
        </Form.Group>
        <h2> </h2>
        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an account? <Link to='/login'>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}
export default RegisterScreen
