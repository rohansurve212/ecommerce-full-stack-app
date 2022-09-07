/** @format */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getAllUsers,
  deleteUser,
} from '../features/adminRights/adminRightsSlice'

const UserListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { users, isLoading, isError, message } = useSelector(
    (state) => state.adminRights
  )

  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    !user
      ? navigate('/login')
      : user.isAdmin
      ? dispatch(getAllUsers())
      : navigate('/')
  }, [dispatch, navigate, user])

  const deleteUserHandler = (userId) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(userId))
      dispatch(getAllUsers())
      window.location.reload()
    }
  }

  return (
    <>
      <h1>Users</h1>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>{message}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteUserHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}
export default UserListScreen
