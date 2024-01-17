import React from 'react'
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormLayout from '../components/FormLayout';
import { saveShippingAddress } from '../slices/cartApiSlice';
import CheckoutTimeline from '../components/CheckoutTimeline';

const ShippingPage = () => {
    const Cart = useSelector((state) => state.cart);
    const { ShippingAddress } = Cart;

    const [address, setAddress] = useState(ShippingAddress?.address || '');
    const [city, setCity] = useState(ShippingAddress?.city || '');
    const [PostalCode, setPostalCode] = useState(ShippingAddress?.PostalCode || '');
    const [Country, setCountry] = useState(ShippingAddress?.Country || '');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, PostalCode, Country }));
        navigate('/payment');
    }


  return (
    <FormLayout>
        <CheckoutTimeline />
        <h1> Shipping </h1>

        <Form onSubmit={submitHandler} >
            <Form.Group controlId='address' className='my-2'>
                <Form.Label> Address </Form.Label>
                <Form.Control 
                    type='text'
                    placeholder='Enter Address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
            </Form.Group>

            <Form.Group controlId='city' className='my-2'>
                <Form.Label> City </Form.Label>
                <Form.Control 
                    type='text'
                    placeholder='Enter City'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
            </Form.Group>

            <Form.Group controlId='PostalCode' className='my-2'>
                <Form.Label> Post Code </Form.Label>
                <Form.Control 
                    type='text'
                    placeholder='Enter Post Code'
                    value={PostalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
            </Form.Group>

            <Form.Group controlId='Country' className='my-2'>
                <Form.Label> Country </Form.Label>
                <Form.Control 
                    type='text'
                    placeholder='Enter Country'
                    value={Country}
                    onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-2'>
                Continue 
            </Button>
        </Form>
    </FormLayout>
  )
}

export default ShippingPage;