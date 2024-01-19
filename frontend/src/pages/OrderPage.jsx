// OrderPage.js
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Message from '../components/Message';
import ScreenLoader from '../components/ScreenLoader';
import { useGetOrderDetailsQuery, useGetPayPalClientIdQuery, usePayOrderMutation } from '../slices/ordersApiSlice.js';

const OrderPage = () => {
  const { id: orderId } = useParams();

  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

  console.log(order);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { userInfo } = useSelector((state) => state.auth);
  const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery();

  console.log(order);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {

      const loadPayPalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  function onApprove(data, actions) {
    actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('Payment successful');
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    });
  }

  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success('Payment successful');
  }

  function onError(err) {
    toast.error(err?.data?.message || err.message);
  }

  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: order.totalPrice,
          },
        },
      ],
    }).then((orderId) => orderId);
  }

  return isLoading ? (
    <ScreenLoader />
  ) : error ? (
    <Message variant="danger" />
  ) : (
    <>
      <h1> Order {order._id} </h1>
      <Row>
        <Col md={6}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2> Shipping </h2>
              <p> 
                <strong> Name: </strong> {order.user.name}
              </p>
              <p> 
                <strong> Email: </strong> {order.user.email}
              </p>
              <p> 
                <strong> Address: </strong> {order.ShippingAddress.address},
                {order.ShippingAddress.city} {' '} 
                {order.ShippingAddress.PostalCode} {order.ShippingAddress.Country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
                <h2> Payment Method </h2>
                <p>
                  <strong> Method: </strong>
                  {order.PaymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant='success'>
                    Paid on {order.paidAt}
                  </Message>
                ): (
                  <Message variant='danger'> Not Paid </Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2> Order Items </h2>
                {order.orderItems.map((item,index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                      <Link to={`product/${item.product}`}> {item.name}
                      </Link>
                      </Col>
                      <Col md={4}>
                        {item.quantity} x ${item.price} = ${item.quantity * item.price}
                      </Col>
                    </Row>
                    </ListGroup.Item>
                ))}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Summary</h2>
                <Row>
                  <Col> Shipping </Col>
                  <Col>${order.ShippingPrice}</Col>
                </Row>
                <Row>
                  <Col> Tax To Pay </Col>
                  <Col>${order.TaxPrice}</Col>
                </Row>
                <Row>
                  <Col> Total Price </Col>
                  <Col>${order.TotalPrice}</Col>
                </Row>
              </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              {/* ... rest of your component code */}
              <ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <ScreenLoader />}
                    {isPending ? (
                      <ScreenLoader />
                    ) : (
                      <div>
                        {/* Button onClick={onApproveTest} style={{ marginBottom: '15px' }}> Pay Order </Button> */}
                        <div>
                          <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                          ></PayPalButtons>
                        </div>
                      </div>
                    )}
                  </ListGroup.Item>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
