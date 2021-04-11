import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions.js";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants.js";

const Product = ({ history, match }) => {
  const [quantity, setQuantity] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successReview, error: errorReview } = productReviewCreate;

  useEffect(() => {
    if (successReview) {
      alert("Review Submitted.");
      setRating(0);
      setComment("");
      dispatch({
        type: PRODUCT_CREATE_REVIEW_RESET,
      });
    }

    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successReview]);

  const addToCartHandler = () => {
    history.push(
      `/cart/${match.params.id}?quantity=${quantity > 0 ? quantity : 1}`
    );
  };

  const reviewSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(createProductReview(match.params.id, { rating, comment }));
  };

  return (
    <>
      <Link className='btn btn-light m-2' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varient='danger'>{error}</Message>
      ) : (
        <div className='container-fluid'>
          <div className='card mb-3' style={{ maxWidth: "720px" }}>
            <div className='row g-0'>
              <div className='col-md-4'>
                <img
                  className='img-fluid'
                  src={product.image}
                  alt={product.name}
                />
              </div>
              <div className='col-md-8'>
                <div className='card-body'>
                  <h4 className='card-title'>{product.name}</h4>
                  <p
                    className='lead'
                    style={
                      product.countInStock > 0
                        ? { color: "#4CFF01" }
                        : { color: "#D7415E" }
                    }
                  >
                    {product.countInStock > 0
                      ? "Available in stock."
                      : "Currently out of stock."}
                  </p>
                  <Rating
                    rating={product.rating}
                    reviews={product.numReviews}
                  />
                  <h6 className='card-text' style={{ color: "#2469A0" }}>
                    Company : {product.brand}
                  </h6>
                  <h5>
                    Description : <br />
                  </h5>
                  <p className='card-text'>{product.description}</p>
                  <h6 className='card-subtitle mb-2 text-muted'>
                    <del>M.R.P.: &#x20B9; {product.price}</del>
                  </h6>
                  <h6 className='card-subtitle mb-2'>
                    Price : &#x20B9; {product.discountPrice}
                  </h6>
                  <p className='card-text'>
                    <small style={{ color: "#10BCE3" }}>
                      Inclusive of all taxes.
                    </small>
                  </p>
                  <div className='row'>
                    {product.countInStock > 0 && (
                      <div className='col input-group'>
                        <button
                          className='btn btn-outline-secondary'
                          type='button'
                        >
                          Quantity :
                        </button>
                        <select
                          className='form-select'
                          id='inputGroupSelect04'
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    <button
                      onClick={addToCartHandler}
                      type='button'
                      className='col btn btn-info'
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </button>
                  </div>
                  <div className='row'>
                    <div className='col'>
                      <h2>Reviews : </h2>
                      {product.reviews.length === 0 && (
                        <Message varient='info'>No Reviews.</Message>
                      )}
                      <ul className='list-group'>
                        {product.reviews.map((review) => {
                          return (
                            <React.Fragment key={review._id}>
                              <li className='list-group-item'>
                                <strong>{review.name}</strong>
                                <Rating rating={review.rating} />
                                <p>Date: {review.createdAt.substring(0, 10)}</p>
                                <p>Comment: {review.comment}</p>
                              </li>
                            </React.Fragment>
                          );
                        })}
                        <li className='list-group-item'>
                          <h2>Write a review : </h2>
                          {errorReview && (
                            <Message varient='danger'>{errorReview}</Message>
                          )}
                          {userInfo ? (
                            <form onSubmit={reviewSubmitHandler}>
                              <label
                                htmlFor='customRange3'
                                className='form-label'
                              >
                                Rating :
                              </label>
                              <input
                                type='range'
                                className='form-range'
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                min='0'
                                max='5'
                                step='0.5'
                                id='customRange3'
                              />
                              <div className='input-group mt-2'>
                                <span className='input-group-text'>
                                  Comment :
                                </span>
                                <textarea
                                  className='form-control'
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                  aria-label='With textarea'
                                ></textarea>
                              </div>
                              <button
                                type='submit'
                                className='btn btn-block btn- mt-2'
                              >
                                Submit Review
                              </button>
                            </form>
                          ) : (
                            <Message>
                              Please <Link to='/login'>Sign In</Link> to write a
                              review.
                            </Message>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
