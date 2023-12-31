import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import LogoImage from '../assets/TradeMarket.png'; 
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {

  const { cartItems } = useSelector((state) => state.cart);
  

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
              <LinkContainer to="/user">
              <Nav.Link href="/user"><FaUser /> User</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
