import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer.js";
import CheckoutSteps from "../components/CheckoutSteps.js";
import { savePaymentMethod } from "../actions/cartActions.js";

const PaymentMethod = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <div className='progress mb-4' style={{ height: "1px" }}>
        <div
          className='progress-bar'
          role='progressbar'
          style={{ width: "50%" }}
          aria-valuenow='25'
          aria-valuemin='0'
          aria-valuemax='100'
        ></div>
      </div>
      <h1>Payment Method</h1>
      <form onSubmit={submitHandler}>
        <legend>Select Payment Method : </legend>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='radio'
            name='paymentMethod'
            value='Paypal'
            onChange={(e) => setPaymentMethod(e.target.value)}
            checked
            id='flexCheckDefault'
          />
          <label className='form-check-label' htmlFor='flexCheckDefault'>
            PayPal
          </label>
        </div>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='radio'
            name='paymentMethod'
            value='Stripe'
            onChange={(e) => setPaymentMethod(e.target.value)}
            id='flexCheckDefault'
          />
          <label className='form-check-label' htmlFor='flexCheckDefault'>
            Stripe
          </label>
        </div>
        <button type='submit' className='btn btn-primary mt-4'>
          Proceed Ahead
        </button>
      </form>
    </FormContainer>
  );
};

export default PaymentMethod;
