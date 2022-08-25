/** @format */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { updateUserProfile, reset } from '../features/user/userSlice'
import { getMyOrders } from '../features/userAllOrders/userAllOrdersSlice'

const ProfileScreen = () => {
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.user
  )

  const {
    orders,
    isLoading: uaoLoading,
    isError: uaoError,
    message: uaoMessage,
  } = useSelector((state) => state.userAllOrders)

  const USER_PROFILE_DATA_INITIAL_STATE = {
    name: user.name,
    email: user.email,
    password: '',
    confirmPassword: '',
    errorMessage: null,
  }
  const [formData, setFormData] = useState(USER_PROFILE_DATA_INITIAL_STATE)

  const { name, email, password, confirmPassword, errorMessage } = formData

  const [userUpdateIntended, setUserUpdateIntended] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
      dispatch(reset())
    }
    dispatch(getMyOrders())
  }, [user, navigate, dispatch])

  const formDataChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(reset())
    setUserUpdateIntended(true)

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
        {userUpdateIntended && isSuccess && (
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
        {uaoLoading ? (
          <Loader />
        ) : uaoError ? (
          <Message variant='danger'>{uaoMessage}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL AMOUNT</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>$ {order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i
                        className='fas fa-times'
                        style={{
                          color: 'red',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-around',
                        }}
                      ></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i
                        className='fas fa-times'
                        style={{
                          color: 'red',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-around',
                        }}
                      ></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}
export default ProfileScreen
