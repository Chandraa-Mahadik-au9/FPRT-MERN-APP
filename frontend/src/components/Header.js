import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, Route } from "react-router-dom";
import Cart from "../assets/cart.svg";
import { logout } from "../actions/userActions.js";
import Search from "./Search";
import Logo from "../assets/logo.svg";

const Header = () => {
    
  let history = useHistory();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // console.log(userInfo);

  const logoutHandler = () => {
    dispatch(logout());
    localStorage.clear();
    history.push("/");
    console.log("Logout successful.");
  };
  return (
    <div>
      <nav
        className='navbar navbar-light navbar-expand-lg'
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <div className='container-fluid'>
          <Link to='/' className='navbar-brand'>
            <img src={Logo} style={{ width: "2rem" }} alt='logo' />
            <span style={{ lineHeight: "2rem", margin: "0 0.5rem" }}>
              My Shop
            </span>
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link className='nav-link active' aria-current='page' to='/'>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/'>
                  Link
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/'>
                  Link
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/'>
                  Link
                </Link>
              </li>
            </ul>
            <div className='d-flex'>
              <Link to='/cart' className='align-self-center'>
                <img className='cart' src={Cart} alt='cart' />
                <strong className='bg-transparent m-1 border-0'>Cart</strong>
              </Link>
              {userInfo ? (
                <div className='dropdown ml-1'>
                  <button
                    className='btn btn-primary dropdown-toggle profileButton'
                    id='dropdownMenuLink'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    {userInfo.name}
                  </button>

                  <ul
                    className='dropdown-menu'
                    aria-labelledby='dropdownMenuLink'
                  >
                    <li>
                      <Link className='dropdown-item' to='/profile'>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button className='dropdown-item' onClick={logoutHandler}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div>
                  <Link to='/login'>
                    <button className='btn btn-outline-primary m-1 border-0'>
                      Sign In
                    </button>
                  </Link>
                </div>
              )}
              {userInfo && userInfo.isAdmin && (
                <div className='dropdown ml-1'>
                  <button
                    className='btn btn-primary dropdown-toggle profileButton'
                    id='dropdownMenuLink'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    Admin
                  </button>

                  <ul
                    className='dropdown-menu'
                    aria-labelledby='dropdownMenuLink'
                  >
                    <li>
                      <Link className='dropdown-item' to='/admin/userslist'>
                        Users
                      </Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/admin/productslist'>
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/admin/orderslist'>
                        Orders
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
              {userInfo && userInfo.isMerchant && (
                <div className='dropdown ml-1'>
                  <button
                    className='btn btn-primary dropdown-toggle profileButton'
                    id='dropdownMenuLink'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    Merchant
                  </button>

                  <ul
                    className='dropdown-menu'
                    aria-labelledby='dropdownMenuLink'
                  >
                    <li>
                      <Link className='dropdown-item' to='/admin/productslist'>
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/admin/orderslist'>
                        Orders
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Route render={({history}) => <Search history={history} />} />
    </div>
  );
};

export default Header;
