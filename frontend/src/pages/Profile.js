import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import { getUserDetails } from "../actions/userActions.js";
import { listMyOrders } from "../actions/orderActions.js";
import Cross from "../assets/cross.svg";

const Profile = ({ location, history }) => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getMyOrders = useSelector((state) => state.getMyOrders);
  const { loading: ordersLoading, error: ordersError, orders } = getMyOrders;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
      //   history.push('/');  // redirect to home page
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      }
    }
  }, [dispatch, history, userInfo, user]);

  return (
    <div className='row'>
      <div className='col col-md-3'>
        <p>
          <strong>Name : </strong>
          {user.name}
        </p>
        <p>
          <strong>Email : </strong>
          {user.email}
        </p>
        <h4 className='mt-2'>
        <button className='btn btn-light'>
          <Link to='/updateprofile'>Update Profile</Link>
        </button>
        </h4>
      </div>
      <div className='col col-md-9 border-left'>
        <h2>My Orders</h2>
        {ordersLoading ? (
          <Loader />
        ) : ordersError ? (
          <Message varient='danger'>{ordersError}</Message>
        ) : (
          <table className='table table-responsive table-bordered table-md table-hover'>
            <thead>
              <tr>
                <th scope='col'>ORDER ID</th>
                <th scope='col'>DATE</th>
                <th scope='col'>TOTAL</th>
                <th scope='col'>PAID</th>
                <th scope='col'>DELIVERED</th>
                <th scope='col'>DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <img
                          src={Cross}
                          alt='cross'
                          style={{ width: "1rem" }}
                        />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <img
                          src={Cross}
                          alt='cross'
                          style={{ width: "1rem" }}
                        />
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
    </div>
  );
};

export default Profile;
