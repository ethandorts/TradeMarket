import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {Row, Col, ListGroup, Image, Button , Card } from 'react-bootstrap';
import RatingScale from '../components/RatingScale';

const ProductPage = () => {

const [product, setProduct] = useState({});


  const { id: productId } = useParams(); 
  useEffect(() => {
    const ProductFetch = async () => {
      const { data } = await axios.get(`/api/products/${productId}`);
      setProduct(data);
  }
  
  ProductFetch();
}, [productId]);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
    <Link className='btn btn-light my-3' to="/"> Return Home</Link>
    <Row>
      <Col md={5}>
        <Image src={`/products-and-images/products-and-images/images/${product.image}`} alt={product.name} fluid></Image>
      </Col>
      <Col md={3}>
        <ListGroup variable='flush'>
          <ListGroup.Item>
            <h3>{product.name}</h3>
          </ListGroup.Item>
          <ListGroup.Item>
            <RatingScale value={product.rating} text={` ${product.numReviews} reviews`} />
          </ListGroup.Item>
          <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
          <ListGroup.Item>Description: {product.description}</ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={3}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Row>
                <Col>Status </Col>
                <Col>
                <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                className='btn btn-primary'
                type='button'
                disabled={product.countInStock <= 0}
                >Add to Cart</Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>
    </div>
    </>
  );
};

export default ProductPage;
