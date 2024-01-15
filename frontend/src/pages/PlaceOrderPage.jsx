import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col, Row, ListGroup, Image, Card } from 'react-bootstrap';
import CheckoutTimeline from '../components/CheckoutTimeline';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import ScreenLoader from '../components/ScreenLoader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartApiSlice';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [CreateOrder, { isLoading, error }] = useCreateOrderMutation();

  const PlaceOrderHelper = async () => {
    try {
      const res = await CreateOrder({
        orderItems: cart.cartItems,
        ShippingAddress: cart.ShippingAddress,
        PaymentMethod: cart.PaymentMethod,
        itemsPrice: cart.itemsPrice,
        ShippingPrice: cart.ShippingPrice,
        TaxPrice: cart.TaxToPay,
        TotalPrice: cart.OverallPrice
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      console.error('MongoDB Save Error:', err);
      const errorMessage = err.message || 'An error occurred';
      toast.error(`Failed to place order. ${errorMessage}`);
      // You may want to redirect the user to an error page or handle recovery
      // Example: navigate('/error');
    }
  };

  return (
    <>
      <CheckoutTimeline step1 step2 step3 step4 />
      <Row>
        <Col md={6}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>Shipping</h3>
              <p>
                <strong>Address: </strong>
                {cart.ShippingAddress.address}, {cart.ShippingAddress.city}, {cart.ShippingAddress.postalCode}, {cart.ShippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.PaymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2> Order Items </h2>
              {cart.cartItems.length === 0 ? (
                <Message> Your Cart is Empty </Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid round />
                        </Col>
                        <Col>
                          <Link to={`products/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x ${item.price} = ${item.quantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3> Order Summary </h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items: </Col>
                  <Col>${cart.TotalItemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping: </Col>
                  <Col>${cart.ShippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax: </Col>
                  <Col>${cart.TaxToPay}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price: </Col>
                  <Col>${cart.OverallPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{String(error)}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems.length === 0}
                  onClick={PlaceOrderHelper}
                >
                  Place Order
                </Button>
                {isLoading && <ScreenLoader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
