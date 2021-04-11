import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import FormContainer from "../components/FormContainer.js";
import { login } from "../actions/userActions.js";

const Login = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";
//   const redirect = location.search ? location.search.split("=")[1] : location.pathname;
//   console.log(redirect);

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    //   history.push('/');  // redirect to home page
    }
  }, [history, redirect, userInfo]);

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Log In : </h1>
      {error && <Message varient='danger'>{error}</Message>}
      {loading && <Loader />}
      <form onSubmit={submitHandler}>
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
        <button type='submit' className='btn btn-primary'>
          Log In
        </button>
      </form>
      <hr />
      <div className='row py-3'>
        <div className='col'>
          <h5>New At Deals Wagon ? </h5>
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </div>
      </div>
    </FormContainer>
  );
};

export default Login;
