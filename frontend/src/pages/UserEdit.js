import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import FormContainer from "../components/FormContainer.js";
import { getUserDetails, updateUser } from "../actions/userActions.js";
import { USERS_UPDATE_RESET } from "../constants/userConstants.js";

const UserEdit = ({ match, history }) => {
  const userId = match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMerchant, setIsMerchant] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({
        type: USERS_UPDATE_RESET,
      });
      history.push("/admin/userslist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
        setIsMerchant(user.isMerchant);
      }
    }
  }, [successUpdate, history, user, userId, dispatch]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin, isMerchant }));
  };

  return (
    <>
      <Link to='/admin/userslist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User : </h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message varient='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message varient='danger'>{error}</Message>
        ) : (
          <form onSubmit={submitHandler}>
            <div className='mb-3'>
              <label htmlFor='exampleInputName1' className='form-label'>
                Name :{" "}
              </label>
              <input
                type='name'
                className='form-control'
                placeholder='Full Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                id='exampleInputName1'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='exampleInputEmail1' className='form-label'>
                Email :{" "}
              </label>
              <input
                type='email'
                className='form-control'
                placeholder='abc@xyz.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
              />
            </div>
            <div className='mb-3'>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  id='flexCheckDefault'
                />
                <label className='form-check-label' htmlFor='flexCheckDefault'>
                  Is Admin
                </label>
              </div>
            </div>
            <div className='mb-3'>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  checked={isMerchant}
                  onChange={(e) => setIsMerchant(e.target.checked)}
                  id='flexCheckDefault'
                />
                <label className='form-check-label' htmlFor='flexCheckDefault'>
                  Is Merchant
                </label>
              </div>
            </div>
            <button type='submit' className='btn btn-primary'>
              Update
            </button>
          </form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEdit;
