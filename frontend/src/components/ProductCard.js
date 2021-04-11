import React from "react";
import { Link } from 'react-router-dom';
import Rating from './Rating.js';

const Product = ({ product }) => {
  return (
    <React.Fragment>
      <div className='col'>
        <div className='card shadow-mg h-100' style={{backgroundColor: "#e3f2fd"}}>
          <Link to={`/product/${product._id}`}>
            <img src={product.image} className='mx-auto d-block productImg' alt='product' />
          </Link>
          
          <div className='card-body'>
            <Link to={`/product/${product._id}`}>
              <h5 className='card-title'>{product.name}</h5>
            </Link>
            <p className='card-text'><del>&#x20B9; {product.price}</del></p>
            <p className='card-text'>&#x20B9; {product.discountPrice}</p>
            <Rating rating={product.rating} reviews={product.numReviews} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Product;
