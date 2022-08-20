/** @format */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  updateUserProfile,
  resetUserProfile,
  reset,
} from '../features/user/userSlice'

const ProfileScreen = () => {
  const { user } = useSelector((state) => state.auth)
  const { userProfile, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.user
  )

  const USER_PROFILE_DATA_INITIAL_STATE = {
    name: user.name,
    email: user.email,
    password: '',
    confirmPassword: '',
    errorMessage: null,
  }
  const [formData, setFormData] = useState(USER_PROFILE_DATA_INITIAL_STATE)

  const { name, email, password, confirmPassword, errorMessage } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
      dispatch(resetUserProfile())
      dispatch(reset())
    }

    if (userProfile) {
      dispatch(reset())
    }
  }, [user, userProfile, navigate, dispatch])

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
        errorMessage: 'Passwords do not match',
      }))
    } else {
      const updatedUserData = {
        name,
        email,
        password,
      }

      dispatch(updateUserProfile(updatedUserData))
      dispatch(reset())
      setFormData({
        name: updatedUserData.name,
        email: updatedUserData.email,
        password: '',
        confirmPassword: '',
        errorMessage: null,
      })
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
        {isError && <Message variant='danger'>{message}</Message>}
        {isSuccess && (
          <Message variant='success'>User Profile updated successfully</Message>
        )}
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
            Update Profile
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  )
}
export default ProfileScreen
