import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RatingScale from './RatingScale';

const ProductCard = ({ product }) => {

  const cardStyle = {
    height: '100%', 
  };

  return (
    <Card className="mb-4 p-4 rounded" style={cardStyle}>
      <Link to={`/product/${product._id}`}>
        <img
          src={`/products-and-images/products-and-images/images/${product.image}`}  
          alt={product.name}
          className="card-img-top"
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <h5>{product.name}</h5>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <RatingScale value={product.rating} text={`${product.numReviews} reviews`} />
        </Card.Text>
        <Card.Text as="p">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
