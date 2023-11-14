import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import LogoImage from '../assets/TradeMarket.png'; 

const Header = () => {
  return (
    <header>
      <Navbar style={{backgroundColor:'#1b7ced'}} variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand href="/" style={{fontFamily: 'Archivo Black, sans-serif'}}>
            <img
              src={LogoImage}
              alt="TradeMarket Logo"
              height="30"
              className="d-inline-block align-top"
            />
            {' TradeMarket'}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/basket"><FaShoppingCart /> Cart</Nav.Link>
              <Nav.Link href="/user"><FaUser /> User</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
