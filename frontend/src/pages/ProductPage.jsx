import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {Row, Col, Form, ListGroup, Image, Button , Card } from 'react-bootstrap';
import RatingScale from '../components/RatingScale';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { AddToCart } from '../slices/cartApiSlice';
import ScreenLoader from '../components/ScreenLoader';
import Message from '../components/Message';
import { useDispatch } from 'react-redux';

const ProductPage = () => {
  const { id: productId } = useParams(); 

  const Dispatch = useDispatch();
  const Navigate = useNavigate();

  const { data: product, isLoading, Error} = useGetProductDetailsQuery(productId);

  const [quantity, setQuantity] = useState(1);

  const AddToCartHelper = () => {
      Dispatch(AddToCart({ ...product, quantity }));
      Navigate('/mycart');
  }

  if (Error) {
    return { Error };
  }

  return (
    <>
    <Link className='btn btn-light my-3' to="/"> Return Home</Link>

    { isLoading ? (<ScreenLoader />) : Error ? (<Message variant='danger'>Error?.data?.message</Message>) : (
      <>
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

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>
                    <Col> Quantity </Col>
                    <Form.Control
                    as='select' value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={ x + 1 } value= {x + 1}>
                          {x + 1}
                        </option>

                      ))}

                    </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  className='btn btn-primary'
                  type='button'
                  disabled={product.countInStock <= 0}
                  onClick={AddToCartHelper}
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
    ) }
    </>
  );
};

export default ProductPage;
