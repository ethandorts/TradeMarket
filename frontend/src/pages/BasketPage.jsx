import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Form, ListGroup, Image, Button, Card } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { AddToCart, RemoveItemFromCart } from '../slices/cartApiSlice';

const BasketPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const AddToCartHelper = async (product, quantity) => {
        dispatch(AddToCart({ ...product, quantity }));
    };

    const RemoveItemFromCartHelper = async (id) => {
        dispatch(RemoveItemFromCart(id));
    }

    const CheckoutHelper = async () => {
        navigate('/login?redirect=/shipping');
    }

    return (
        <Row>
            <Col md={6}>
                <h1 style={{ marginBottom: '10px' }}>Basket</h1>
                {cartItems.length === 0 ? (
                    <Message>
                        Your basket is empty <Link to="/">Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item._id}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={`/products-and-images/products-and-images/images/${item.image}`} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control
                                            as='select'
                                            value={item.quantity}
                                            onChange={(e) => AddToCartHelper(item, Number(e.target.value))}
                                        >
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type='button' variant='light' onClick={ () => RemoveItemFromCartHelper(item._id) }>
                                            <FaTrash />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>
                                Subtotal ({cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0)}) Items
                            </h2>
                            Total Price: ${cartItems.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type="button" className='btn-block' disabled={cartItems.length <= 0} onClick={CheckoutHelper}>
                                Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};

export default BasketPage;
