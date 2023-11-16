// ProductPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../products'; // Import your products array

const ProductPage = () => {
  const { id: productId } = useParams(); // Corrected the parameter name to match ":id"
  const product = products.find((p) => p._id === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>
    </div>
  );
};

export default ProductPage;
