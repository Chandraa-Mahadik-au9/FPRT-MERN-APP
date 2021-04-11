import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/Message.js";
import CheckoutSteps from "../components/CheckoutSteps.js";
import { createOrder } from "../actions/orderActions.js";

const PlaceOrder = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  //   console.log(cart);

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  cart.shippingPrice = cart.itemsPrice > 1000 ? 0 : 99;

  cart.taxPrice = Number((cart.itemsPrice * 0.05).toFixed(2));

  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { success, order, error } = orderCreate;
  console.log(orderCreate)

  useEffect(() => {
    if (success) {
      history.push(`/orders/${order._id}`)
    }
  }, [success, history, order]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className='progress mb-4' style={{ height: "1px" }}>
        <div
          className='progress-bar'
          role='progressbar'
          style={{ width: "75%" }}
          aria-valuenow='25'
          aria-valuemin='0'
          aria-valuemax='100'
        ></div>
      </div>
      <div className='row'>
        <div className='col col md-8'>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item'>
              <h4>Shipping</h4>
              <p className='mt-2'>
                <strong>Your delivery Address : </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.pincode}, {cart.shippingAddress.stateName}
                , {cart.shippingAddress.country}.
              </p>
            </li>
            <li className='list-group-item'>
              <h4>Payment Method</h4>
              <strong>Your payment method : {cart.paymentMethod}</strong>
            </li>
            <li className='list-group-item'>
              <h4>Orders</h4>
              {cart.cartItems.length === 0 ? (
                <Message varient='info'>Your cart is empty.</Message>
              ) : (
                <ul className='list-group list-group-flush'>
                  {cart.cartItems.map((item) => {
                    return (
                      <li className='list-group-item' key={item.product}>
                        <div className='row'>
                          <div className='col col-md-1'>
                            <img
                              className='productPlaceOrderImg'
                              src={item.image}
                              alt={item.name}
                            />
                          </div>
                          <div className='col ml-4 my-auto'>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>
                          <div className='col col-md-4'>
                            {item.quantity} X &#x20B9; {item.price} = &#x20B9;{" "}
                            {item.quantity * item.price}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          </ul>
        </div>
        <div className='col col-md-4'>
          <div className='card'>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item'>
                <h4>Order Summary : </h4>
              </li>
              <li className='list-group-item'>
                <div className='row'>
                  <div className='col'>
                    <strong>Total price :</strong>
                  </div>
                  <div className='col'>&#x20B9; {cart.itemsPrice}</div>
                </div>
              </li>
              <li className='list-group-item'>
                <div className='row'>
                  <div className='col'>
                    <strong>Delivery Charges :</strong>
                  </div>
                  <div className='col'>&#x20B9; {cart.shippingPrice}</div>
                </div>
              </li>
              <li className='list-group-item'>
                <div className='row'>
                  <div className='col'>
                    <strong>GST charges :</strong>
                  </div>
                  <div className='col'>&#x20B9; {cart.taxPrice}</div>
                </div>
              </li>
              <li className='list-group-item'>
                <div className='row'>
                  <div className='col'>
                    <strong>Total Amount :</strong>
                  </div>
                  <div className='col'>&#x20B9; {cart.totalPrice}</div>
                </div>
              </li>
              {error && (
                <li className='list-group-item'>
                  <Message varient='danger'>{error}</Message>
                </li>
              )}
              <li className='list-group-item'>
                <button
                  className='btn btn-block btn-info'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  PLACE ORDER
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
