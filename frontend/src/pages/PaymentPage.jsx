import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button , Col } from 'react-bootstrap';
import FormLayout from '../components/FormLayout';
import CheckoutTimeline from '../components/CheckoutTimeline';
import { savePaymentMethod } from '../slices/cartApiSlice';

const PaymentPage = () => {
    const [PaymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { ShippingAddress } = cart;

    useEffect(() => {
        if(!ShippingAddress) {
            navigate('/shipping');
        }
     }, [ShippingAddress, navigate]);

     const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(PaymentMethod));
        navigate('/placeorder');
     }

  return (
    <FormLayout>
        <CheckoutTimeline stage1={true} stage2={true} stage3={true} />
        <h1> Payment Method </h1>
        <Form onSubmit={submitHandler}>
        <Form.Group>
            <Form.Label as='legend'> Select Method</Form.Label>
            <Col>
                <Form.Check
                type='radio'
                className='my-2'
                label='Paypal or Credit Card'
                id='Paypal'
                name='PaymentMethod'
                value='PayPal'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
            </Col>
        </Form.Group>
        <Button type='submit' variant='primary'> Continue </Button>
        </Form>
    </FormLayout>
  )
}

export default PaymentPage