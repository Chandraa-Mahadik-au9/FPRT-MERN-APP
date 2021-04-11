import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import { listAllOrders } from "../actions/orderActions.js";
import Cross from "../assets/cross.svg";

const OrderList = ({ history }) => {
  const dispatch = useDispatch();

  const listOrders = useSelector((state) => state.listOrders);
  const { loading, error, orders } = listOrders;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && (userInfo.isAdmin)) {
      dispatch(listAllOrders());
    } else if (userInfo && userInfo.isMerchant) {
      dispatch(listAllOrders());
    } else {
      history.push("/login");
    }
  }, [userInfo, dispatch, history]);

  return (
    <div>
      <h1>All Orders : </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varient='danger'>{error}</Message>
      ) : (
        <table className='table table-hover table-bordered table-responsive table-md mx-auto'>
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>MORE</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>&#x20B9; {order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <img src={Cross} alt='cross' style={{ width: "1rem" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <img src={Cross} alt='cross' style={{ width: "1rem" }} />
                    )}
                  </td>
                  <td>
                    <button className='btn btn-light'>
                      <Link to={`/orders/${order._id}`}>Details</Link>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderList;
