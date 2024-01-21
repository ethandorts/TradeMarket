import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import ScreenLoader from '../../components/ScreenLoader';
import FormContainer from '../../components/FormLayout';
import { toast } from 'react-toastify';
import { useUpdateProductMutation, useGetProductDetailsQuery, useUploadProductImageMutation } from '../../slices/productsApiSlice';

const ProductEditPage = () => {
    const { id: productId } = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setcountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);
    const [UpdateProduct, {isLoading: loadingUpdate}] = useUpdateProductMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        const UpdatedProduct = {
            productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description,
        };
    
    const result = await UpdateProduct(UpdatedProduct);
    if (result.error) {
        toast.error(result.error)
    } else {
        toast.success('Product updated');
        navigate('/admin/productList');
    }
};

    const navigate = useNavigate();

    const [UploadProductImage, {isLoading: loadingUpload}] = useUploadProductImageMutation();

    useEffect(() => {
        if(product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setcountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product]);
    
    const UploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
    
        try {
            const res = await UploadProductImage(formData).unwrap();
    
            console.log('Response from server:', res);
    
            const imagePath = res?.image?.replace(/\\/g, '/');
    
            if (imagePath) {
                toast.success(res.message);
                setImage(imagePath);
            } else {
                console.error('Invalid response format - Image path not found:', res);
                toast.error("Invalid response format");
            }
        } catch (err) {
            console.error('Error during file upload:', err);
            toast.error(err?.data?.message || err.error);
        }
    };
    

  return <>
    <Link to='/admin/productList' className='btn btn-light my-3'>
        Go Back
    </Link>
    <FormContainer>
        <h1>Edit Product</h1>
        { loadingUpdate && <ScreenLoader />}

        { isLoading ? <ScreenLoader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control 
                    type='number'
                    placeholder='Enter price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control 
                    type='text'
                    placeholder='Enter Image URL here'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    ></Form.Control>
                    <Form.Control type='file'
                    label='Choose file'
                    onChange={ UploadFileHandler }
                    ></Form.Control>
                </Form.Group> 
                <Form.Group controlId='brand'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control 
                    type='text'
                    placeholder='Enter brand'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control 
                    type='text'
                    placeholder='Enter category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='countInStock'>
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control 
                    type='number'
                    placeholder='Enter the Count In Stock'
                    value={countInStock}
                    onChange={(e) => setcountInStock(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                    type='textarea'
                    placeholder='Enter description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
            </Form.Group>
                <Button 
                type='submit'
                variant='primary'
                className='my-5'
                >Update</Button>
            </Form>
        )}
    </FormContainer>
  </>
  
}

export default ProductEditPage