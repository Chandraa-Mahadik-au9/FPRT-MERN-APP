import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import { getUserDetails, updateUserProfile } from "../actions/userActions.js";

const UpdateProfile = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  console.log(user)

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) =>state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
      //   history.push('/');  // redirect to home page
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Password and confirm password do not match.");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <div className='row justify-content-center'>
      <div className='col col-md-4'>
        <h2>User Profile : </h2>
        {message && <Message varient='danger'>{message}</Message>}
        {error && <Message varient='danger'>{error}</Message>}
        {success && <Message varient='success'>Profile Updated Successfully.</Message>}
        {loading && <Loader />}
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
            <div id='emailHelp' className='form-text'>
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className='mb-3'>
            <label htmlFor='exampleInputPassword1' className='form-label'>
              Password :{" "}
            </label>
            <input
              type='password'
              className='form-control'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id='exampleInputPassword1'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='exampleInputPassword2' className='form-label'>
              Confirm Password :{" "}
            </label>
            <input
              type='password'
              className='form-control'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id='exampleInputPassword2'
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
