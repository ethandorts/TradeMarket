import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import LogoImage from '../assets/TradeMarket.png'; 
import { LinkContainer } from 'react-router-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { useLogoutMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authenticationSlice';

const Header = () => {

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutCall] = useLogoutMutation();

  const LogoutHandler = async () => {
    try {
      await logoutCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header>
      <Navbar style={{backgroundColor:'#1b7ced'}} variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to="/">
          <Navbar.Brand style={{fontFamily: 'Archivo Black, sans-serif'}}>
            <img
              src={LogoImage}
              alt="TradeMarket Logo"
              height="30"
              className="d-inline-block align-top"
            />
            {'TradeMarket'}
          </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/basket">
              <Nav.Link><FaShoppingCart /> Cart { cartItems.length > 0 && (
                <Badge pill bg='success' style={{marginLeft:'7px'}}>
                  { cartItems.reduce((a, c) => a + c.quantity, 0)}               
                </Badge>
              )}</Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={LogoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link href='/login'>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
