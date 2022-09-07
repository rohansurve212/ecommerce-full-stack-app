/** @format */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { getAllOrders } from '../features/adminRights/adminRightsSlice'

const OrderListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    orders,
    getAllOrdersLoading,
    getAllOrdersError,
    getAllOrdersMessage,
  } = useSelector((state) => state.adminRights)

  const { user: loggedInUser } = useSelector((state) => state.user)

  useEffect(() => {
    !loggedInUser
      ? navigate('/login')
      : loggedInUser.isAdmin
      ? dispatch(getAllOrders())
      : navigate('/')
  }, [dispatch, navigate, loggedInUser])

  return (
    <>
      <h1>Orders</h1>
      {getAllOrdersLoading ? (
        <Loader />
      ) : getAllOrdersError ? (
        <Message variant='danger'>{getAllOrdersMessage}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL PRICE</th>
              <th>PAID</th>
              <th>SHIPPED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order._id}</td>
                <td>{order.user?.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>$ {order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isShipped ? (
                    order.shippedAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}
export default OrderListScreen
