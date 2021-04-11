import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import FormContainer from "../components/FormContainer.js";
import { register } from "../actions/userActions.js";

const Register = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

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

    if (password !== confirmPassword) {
        setMessage("Password and confirm password do not match.")
    } else {
        dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up : </h1>
      {message && <Message varient='danger'>{message}</Message>}
      {error && <Message varient='danger'>{error}</Message>}
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
          Register
        </button>
      </form>
      <hr />
      <div className='row py-3'>
        <div className='col'>
          <h5>Already have an account ? </h5>
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </div>
      </div>
    </FormContainer>
  );
};

export default Register;
