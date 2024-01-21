import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Message from '../../components/Message';
import ScreenLoader from '../../components/ScreenLoader';
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';

const ProductListPage = () => {
    const { data: products, isLoading, error, refetch } = useGetProductsQuery();
    const [CreateProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
    const [DeleteProduct, {isLoading: loadingDelete }] = useDeleteProductMutation();

    const deleteHandler = async (id) => {
        if(window.confirm('Are you sure you want to delet this product?')) {
            try {
                await DeleteProduct(id);
                toast.success('Product Deleted');
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    const CreateProductHandler = async () => {
        if (window.confirm('Are you sure you want to add this product?')) {
            try {
                const result = await CreateProduct();
                if (result.data) {
                    refetch();
                } else if (result.error) {
                    toast.error(result.error?.data?.message || result.error?.message || 'An error occurred');
                }
            } catch (err) {
                toast.error(err?.data?.message || err.error);
                console.error('Error creating product', err);
            }
        }
    };

    console.log('Products:', products);

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h2>Products</h2>
                </Col>
                <Col className='text-end'>
                    <Button className='btn-sm m-3' onClick={CreateProductHandler}>
                        <FaEdit /> Create Product
                    </Button>
                </Col>
            </Row>

            {loadingCreate && <ScreenLoader />}
            {loadingDelete && <ScreenLoader />}
            {isLoading ? (
                <ScreenLoader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Table striped hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(products) ? (
                                products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>
                                        <td>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <Button variant='light' className='btn-sm mx-2'>
                                                    <FaEdit />
                                                </Button>
                                            </LinkContainer>
                                            <Button
                                                variant='danger'
                                                className='btn-sm'
                                                onClick={() => deleteHandler(product._id)}>
                                                <FaTrash style={{ color: 'white' }} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <Message variant='danger'>Invalid data format for products.</Message>
                            )}
                        </tbody>
                    </Table>
                </>
            )}
        </>
    );
};

export default ProductListPage;
