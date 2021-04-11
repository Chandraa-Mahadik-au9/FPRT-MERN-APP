import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer.js";
import CheckoutSteps from '../components/CheckoutSteps.js';
import { saveShippingAddress } from "../actions/cartActions.js";

const Shipping = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [pincode, setPincode] = useState(shippingAddress.pincode || '');
  const [stateName, setStateName] = useState(shippingAddress.stateName || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(saveShippingAddress({address, city, pincode, stateName, country}));
    history.push("/payment");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <div className='progress mb-4' style={{height: '1px'}}>
        <div
          className='progress-bar'
          role='progressbar'
          style={{ width: "25%" }}
          aria-valuenow='25'
          aria-valuemin='0'
          aria-valuemax='100'
        ></div>
      </div>
      <h1>Shipping Details: </h1>
      <form onSubmit={submitHandler}>
        <div className='mb-3'>
          <label htmlFor='exampleInputAddress1' className='form-label'>
            Address :{" "}
          </label>
          <input
            type='text'
            className='form-control'
            placeholder='Address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
            id='exampleInputAddress1'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='city' className='form-label'>
            City :{" "}
          </label>
          <input
            type='text'
            className='form-control'
            placeholder='City'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
            id='city'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='pincode' className='form-label'>
            Pincode :{" "}
          </label>
          <input
            type='postal'
            className='form-control'
            placeholder='000 000'
            value={pincode}
            required
            onChange={(e) => setPincode(e.target.value)}
            id='pincode'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='state' className='form-label'>
            State :{" "}
          </label>
          <input
            type='text'
            className='form-control'
            placeholder='State'
            value={stateName}
            required
            onChange={(e) => setStateName(e.target.value)}
            id='state'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='country' className='form-label'>
            Country :{" "}
          </label>
          <input
            type='text'
            className='form-control'
            placeholder='Country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
            id='country'
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Proceed To Payment
        </button>
      </form>
    </FormContainer>
  );
};

export default Shipping;
