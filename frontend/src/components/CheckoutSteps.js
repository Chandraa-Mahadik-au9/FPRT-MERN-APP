import React from "react";
import { Link } from "react-router-dom";

const CheckoutStep = ({ step1, step2, step3, step4 }) => {
  return (
    <div>
      <ul className='nav justify-content-center mb-4'>
        <li className='nav-item'>
          {step1 ? (
            <Link className='nav-link' aria-current='page' to='/login'>
              Sign In
            </Link>
          ) : (
            <a
              className='nav-link disabled'
              href='/login'
              tabIndex='-1'
              aria-disabled='true'
            >
              Sign In
            </a>
          )}
        </li>
        <li className='nav-item'>
          {step2 ? (
            <Link className='nav-link' aria-current='page' to='/shipping'>
              Shipping
            </Link>
          ) : (
            <a
              className='nav-link disabled'
              href='/shipping'
              tabIndex='-1'
              aria-disabled='true'
            >
              Shipping
            </a>
          )}
        </li>
        <li className='nav-item'>
          {step3 ? (
            <Link className='nav-link' aria-current='page' to='/payment'>
              Payment
            </Link>
          ) : (
            <a
              className='nav-link disabled'
              href='/payment'
              tabIndex='-1'
              aria-disabled='true'
            >
              Payment
            </a>
          )}
        </li>
        <li className='nav-item'>
          {step4 ? (
            <Link className='nav-link' aria-current='page' to='/placeorder'>
              Place Order
            </Link>
          ) : (
            <a
              className='nav-link disabled'
              href='/placeorder'
              tabIndex='-1'
              aria-disabled='true'
            >
              Place Order
            </a>
          )}
        </li>
      </ul>
    </div>
  );
};

export default CheckoutStep;
