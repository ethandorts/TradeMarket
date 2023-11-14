import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const RatingScale = ({ text, value }) => {
  // Round the value to the nearest whole number
  const roundedValue = Math.round(value);

  return (
    <div className="ratingScale">
      {[1, 2, 3, 4, 5].map((num) => (
        <span key={num}>
          {roundedValue >= num ? (
            <FaStar />
          ) : roundedValue + 0.5 === num ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
      ))}
      <span className="ratingScale_text">{text && text}</span>
    </div>
  );
};

export default RatingScale;
