import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import { addToCart, removeFromCart } from "../actions/cartActions.js";

const Cart = ({ match, location, history }) => {
  const productId = match.params.id;

  const quantity = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity));
    }
  }, [dispatch, productId, quantity]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    console.log("Check Out.");
    history.push('/login?redirect=shipping')
  };

  return (
    <div className='row'>
      <div className='col-md-8'>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <>
            <Message varient='info'>
              Your shopping cart is empty ! &nbsp;
              <Link to='/'>Go Back</Link>
            </Message>
          </>
        ) : (
          <div className='list-group list-group-flush'>
            {cartItems.map((item) => {
              return (
                <div className='list-group-item' key={item.product}>
                  <div className='row'>
                    <div className='col-md-2 align-self-center'>
                      <img
                        className='productCartImg'
                        src={item.image}
                        alt={item.name}
                      />
                    </div>
                    <div className='col-md-3 align-self-center'>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div className='col-md-2 align-self-center'>
                      &#x20B9; {item.price}
                    </div>
                    <div className='col-md-2 align-self-center'>
                      <select
                        className='form-select'
                        id='inputGroupSelect04'
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='col align-self-center'>
                      <button
                        type='button'
                        className='btn btn-secondary'
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className='col-md-4'>
        <div className='card' style={{ width: "20rem" }}>
          <div className='list-group list-group-flush'>
            <div className='list-group-item'>
              <h4>
                Sub Total : (
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                products.)
              </h4>
              <strong>
                Total Amount : &#x20B9;{" "}
                {cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}
              </strong>
            </div>
            <div className='list-group-item'>
              <button
                className='btn btn-primary'
                onClick={checkOutHandler}
                disabled={cartItems.length === 0}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
