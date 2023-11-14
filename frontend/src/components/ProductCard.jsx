import React from 'react';
import { Card } from 'react-bootstrap';

const ProductCard = ({ product }) => {
  return (
    <Card className="my-4 p-4 rounded">
      <a href={`/product/${product._id}`}>
        <img
          src={`/products-and-images//products-and-images/images/${product.image}`}  
          alt={product.name}
          className="card-img-top"
        />
      </a>
      <Card.Body>
        <a href={`/product/${product._id}`}>
          <Card.Title as="div">
            <h5>{product.name}</h5>
          </Card.Title>
        </a>
        <Card.Text as="p">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
