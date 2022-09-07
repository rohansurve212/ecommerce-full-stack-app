/** @format */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listProducts } from '../features/products/productListSlice'
import {
  deleteProduct,
  createProduct,
  createProductReset,
} from '../features/adminRights/adminRightsSlice'

const ProductListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { products, pages, page, isLoading, isError, message } = useSelector(
    (state) => state.productList
  )

  const { deleteProductLoading, deleteProductError, deleteProductMessage } =
    useSelector((state) => state.adminRights)

  const {
    createdProduct,
    createProductLoading,
    createProductSuccess,
    createProductError,
    createProductMessage,
  } = useSelector((state) => state.adminRights)

  const { user: loggedInUser } = useSelector((state) => state.user)

  const pageNumber = useParams().pageNumber || 1

  useEffect(() => {
    dispatch(createProductReset())
    !loggedInUser
      ? navigate('/login')
      : loggedInUser.isAdmin
      ? dispatch(listProducts({ keyword: '', pageNumber }))
      : navigate('/')

    if (createProductSuccess) {
      navigate(`/admin/product/${createdProduct._id}/edit`)
    }
  }, [
    dispatch,
    navigate,
    loggedInUser,
    pageNumber,
    createdProduct,
    createProductSuccess,
  ])

  const createProductHandler = () => {
    dispatch(createProduct())
    //window.location.reload()
  }

  const deleteProductHandler = (productId) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(productId))
      dispatch(listProducts())
      window.location.reload()
    }
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {(deleteProductLoading || createProductLoading || isLoading) && (
        <Loader />
      )}
      {(deleteProductError && (
        <Message variant='danger'>{deleteProductMessage}</Message>
      )) ||
        (createProductError && (
          <Message variant='danger'>{createProductMessage}</Message>
        ))}
      {isError ? (
        <Message variant='danger'>{message}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>IN STOCK</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>$ {product.price}</td>
                  <td>{product.countInStock}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteProductHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin />
        </>
      )}
    </>
  )
}
export default ProductListScreen
