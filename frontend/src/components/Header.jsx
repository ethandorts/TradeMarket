import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import LogoImage from '../assets/TradeMarket.png'; 
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
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
            {' TradeMarket'}
          </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/basket">
              <Nav.Link><FaShoppingCart /> Cart</Nav.Link>
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
