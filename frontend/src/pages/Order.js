import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import {
  deliverOrder,
  getOrderDetails,
  payOrder,
} from "../actions/orderActions.js";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants.js";
const Order = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  if (!loading) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };

      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [history, userInfo, dispatch, orderId, order, successPay, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message varient='danger'>{error}</Message>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className='row'>
        <div className='col col md-8'>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item'>
              <h4>Shipping</h4>
              <strong>Name : </strong>
              {order.user.name}
              <p>
                Email :{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p className='mt-2'>
                <strong>Your delivery Address : </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.pincode},{" "}
                {order.shippingAddress.stateName},{" "}
                {order.shippingAddress.country}.
              </p>
              {order.isDelivered ? (
                <Message varient='success'>
                  Delivered at : {order.deliveredAt}.
                </Message>
              ) : (
                <Message varient='danger'>Not Delivered.</Message>
              )}
            </li>
            <li className='list-group-item'>
              <h4>Payment Method</h4>
              <p>
                <strong>Your payment method : {order.paymentMethod}</strong>
              </p>
              {order.isPaid ? (
                <Message varient='success'>Paid on : {order.paidAt}.</Message>
              ) : (
                <Message varient='danger'>Not Paid.</Message>
              )}
            </li>
            <li className='list-group-item'>
              <h4>Orders</h4>
              {order.orderItems.length === 0 ? (
                <Message varient='info'>Your order is empty.</Message>
              ) : (
                <ul className='list-group list-group-flush'>
                  {order.orderItems.map((item) => {
                    return (
                      <li className='list-group-item' key={item.product}>
                        <div className='row'>
                          <div className='col col-md-1'>
                            <img
                              style={{ width: "64px" }}
                              className='orderPageOrderImg'
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
                  <div className='col'>&#x20B9; {order.itemsPrice}</div>
                </div>
              </li>
              <li className='list-group-item'>
                <div className='row'>
                  <div className='col'>
                    <strong>Delivery Charges :</strong>
                  </div>
                  <div className='col'>&#x20B9; {order.shippingPrice}</div>
                </div>
              </li>
              <li className='list-group-item'>
                <div className='row'>
                  <div className='col'>
                    <strong>GST charges :</strong>
                  </div>
                  <div className='col'>&#x20B9; {order.taxPrice}</div>
                </div>
              </li>
              <li className='list-group-item'>
                <div className='row'>
                  <div className='col'>
                    <strong>Total Amount :</strong>
                  </div>
                  <div className='col'>&#x20B9; {order.totalPrice}</div>
                </div>
              </li>
              {!order.isPaid && (
                <li className='list-group-item'>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </li>
              )}
              {loadingDeliver && <Loader />}
              {userInfo && (userInfo.isAdmin || userInfo.isMerchant) && order.isPaid && !order.isDelivered && (
                <li className='list-group-item'>
                  <button
                    className='btn btn-primary btn-block'
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
