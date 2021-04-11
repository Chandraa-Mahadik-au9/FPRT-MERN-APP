import React from "react";
import { Route } from "react-router-dom";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Home from "./pages/Home.js";
import Product from "./pages/Product.js";
import Cart from "./pages/Cart.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Profile from "./pages/Profile.js";
import UpdateProfile from "./pages/UpdateProfile.js";
import Shipping from "./pages/Shipping.js";
import PaymentMethod from "./pages/PaymentMethod.js";
import PlaceOrder from "./pages/PlaceOrder.js";
import Order from "./pages/Order.js";
import UserList from "./pages/UserList.js";
import UserEdit from "./pages/UserEdit.js";
import ProductList from "./pages/ProductList.js";
import ProductEdit from "./pages/ProductEdit.js";
import OrderList from './pages/OrderList.js';

const App = () => {
  return (
    <div className='App'>
      <Header />
      <hr />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/shipping' component={Shipping} />
      <Route path='/payment' component={PaymentMethod} />
      <Route path='/placeorder' component={PlaceOrder} />
      <Route path='/orders/:id' component={Order} />
      <Route path='/profile' component={Profile} />
      <Route path='/updateprofile' component={UpdateProfile} />
      <Route path='/product/:id' component={Product} />
      <Route path='/cart/:id?' component={Cart} />
      <Route path='/admin/userslist' component={UserList} />
      <Route path='/admin/users/:id/edit' component={UserEdit} />
      <Route exact path='/admin/productslist' component={ProductList} />
      <Route exact path='/admin/productslist/:pageNumber' component={ProductList} />
      <Route path='/admin/products/:id/edit' component={ProductEdit} />
      <Route path='/admin/orderslist' component={OrderList} />
      <Route exact path='/search/:keyword' component={Home} />
      <Route path='/page/:pageNumber' component={Home} />
      <Route path='/search/:keyword/page/:pageNumber' component={Home} />
      <Route exact path='/' component={Home} />
      <Footer />
    </div>
  );
};

export default App;
