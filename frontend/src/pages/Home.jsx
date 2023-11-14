import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import products from '../products';

const Home = () => {
  return (
    <div className="container mt-3">
      <h1>Our Products</h1>
      <Row className="mt-3">
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="mb-3">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
