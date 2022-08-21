/** @format */
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

import { logout, getUserProfile, reset } from '../features/user/userSlice'
import { emptyCart, removeShippingAddress } from '../features/cart/cartSlice'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)

  const getProfileHandler = () => {
    dispatch(getUserProfile())
  }

  const logoutHandler = () => {
    dispatch(logout())
    dispatch(emptyCart())
    dispatch(removeShippingAddress())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand href='/'>ShōTenGai</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              {user ? (
                <NavDropdown title={user.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item onClick={getProfileHandler}>
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
