/** @format */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {
  getUserById,
  updateUserById,
} from '../features/adminRights/adminRightsSlice'

const UserEditScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id: userId } = useParams()

  const { user: loggedInUser } = useSelector((state) => state.user)

  const { user, isLoading, isError, message } = useSelector(
    (state) => state.adminRights
  )

  const FORM_DATA_INITIAL_STATE = {
    name: '',
    email: '',
    isAdmin: false,
  }
  const [formData, setFormData] = useState(FORM_DATA_INITIAL_STATE)

  const { name, email, isAdmin } = formData

  useEffect(() => {
    !loggedInUser
      ? navigate('/login')
      : loggedInUser.isAdmin
      ? dispatch(getUserById(userId))
      : navigate('/')

    setFormData({
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  }, [
    dispatch,
    navigate,
    loggedInUser,
    userId,
    user.name,
    user.email,
    user.isAdmin,
  ])

  const formDataChangeHandler = (e) => {
    if (e.target.name === 'isAdmin') {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.checked,
      }))
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }))
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const updatedUserData = {
      _id: userId,
      name,
      email,
      isAdmin,
    }

    dispatch(updateUserById(updatedUserData))
    navigate('/admin/userlist')
    window.location.reload()
  }

  const backButtonHandler = () => {
    navigate('/admin/userlist')
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <FormContainer>
        <h1>Update User Profile</h1>
        {isError ? (
          <Message variant='danger'>{message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                name='name'
                value={name}
                disabled={user.email === 'admin@shotengai.com'}
                onChange={formDataChangeHandler}
              ></Form.Control>
            </Form.Group>
            <h2> </h2>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                name='email'
                value={email}
                disabled={user.email === 'admin@shotengai.com'}
                onChange={formDataChangeHandler}
              ></Form.Control>
            </Form.Group>
            <h2> </h2>
            <Form.Group controlId='isAdmin'>
              <Form.Check
                type='checkbox'
                name='isAdmin'
                label='Is Admin?'
                checked={isAdmin}
                disabled={user.email === 'admin@shotengai.com'}
                onChange={formDataChangeHandler}
              ></Form.Check>
            </Form.Group>
            <h2> </h2>
            <Button type='submit' variant='primary'>
              Update
            </Button>{' '}
            <Button
              variant='primary'
              className='btn btn-light my-3'
              onClick={backButtonHandler}
            >
              Go Back
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}
export default UserEditScreen
