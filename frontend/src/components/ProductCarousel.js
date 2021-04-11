import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Rating from "../components/Rating.js";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import { listTrendingProducts } from "../actions/productActions.js";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const trendingProducts = useSelector((state) => state.trendingProducts);
  const { loading, error, products } = trendingProducts;

  useEffect(() => {
    dispatch(listTrendingProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message varient='danger'>{error}</Message>
  ) : (
    <>
      <h2>
        <span className='badge' style={{ backgroundColor: "#2469A0" }}>
          Trending
        </span>
      </h2>
      <div className='container homeCarousel'>
        {products.map((product) => {
          return (
            <React.Fragment key={product._id}>
              <div className='col'>
                <div className='card shadow-mg h-100'>
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.image}
                      className='mx-auto d-block productImg'
                      alt='product'
                    />
                  </Link>

                  <div className='card-body'>
                    <Link to={`/product/${product._id}`}>
                      <h5 className='card-title'>{product.name}</h5>
                    </Link>
                    <Rating
                      rating={product.rating}
                      reviews={product.numReviews}
                    />
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default ProductCarousel;
