import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/ProductCard.js";
import { listProducts } from "../actions/productActions.js";
import Paginatn from '../components/Paginatn.js';
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import ProductCarousel from "../components/ProductCarousel.js";

const Home = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div>
      {!keyword && <ProductCarousel />}
      <hr />
      <h2>
        <span className='badge' style={{ backgroundColor: "#2469A0" }}>
          Products
        </span>
      </h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varient='danger'>{error}</Message>
      ) : (
        <div className='productBox'>
          <div className='row row-cols-1 row-cols-md-4 g-2 productSubBox'>
            {products.map((product) => {
              return <Product key={product._id} product={product} />;
            })}
          </div>
          <Paginatn pages={pages} page={page} keyword={keyword ? keyword : ''} />
        </div>
      )}
    </div>
  );
};

export default Home;
