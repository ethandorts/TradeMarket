import React from 'react';
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ScreenLoader from './ScreenLoader';
import FormLayout from './FormLayout';
import { useRegisterMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authenticationSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [PasswordConfirmation, setPasswordConfirmation] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, {isLoading}] = useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth);
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if(userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if(password !== PasswordConfirmation) {
            toast.error('Passwords do not match');
        }
        try {
            const res = await register({
                email,
                password,
                name,  // Make sure you include the 'name' field
            }).unwrap();
            dispatch(setCredentials({...res}));
            navigate(redirect);
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    }
    
  return (
    <FormLayout>
        <h1> Register Your Account </h1>

        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='my-3'>
                <Form.Label> Name </Form.Label>
                <Form.Control 
                type="text"
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className='my-3'>
                <Form.Label> Email Address </Form.Label>
                <Form.Control 
                type= "email"
                placeholder='Enter email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className='my-3'>
                <Form.Label> Password </Form.Label>
                <Form.Control 
                type= "password"
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmpassword' className='my-3'>
                <Form.Label> Confirm Password </Form.Label>
                <Form.Control 
                type= "password"
                placeholder='Confirm password'
                value={PasswordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className="mt-2" disbaled={ isLoading }> Register </Button>

            { isLoading && <ScreenLoader />}
        </Form>
    </FormLayout>
  )
}

export default RegisterScreen;