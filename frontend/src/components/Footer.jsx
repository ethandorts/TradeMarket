import React from 'react'
import { Container, Col, Row } from "react-bootstrap"

const Footer = () => {
    const YearNow = new Date().getFullYear();

  return (
    <>
      <footer>
        <Container>
          <Row>
            <Col className='text-center py-3'>
              <p> TradeMarket &copy; { YearNow } </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  )
}

export default Footer