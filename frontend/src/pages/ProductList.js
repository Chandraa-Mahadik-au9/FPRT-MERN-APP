import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import Paginatn from "../components/Paginatn.js";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions.js";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants.js";

const ProductList = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    dispatch({
      type: PRODUCT_CREATE_RESET,
    });
    if (!(userInfo.isAdmin || userInfo.isMerchant)) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/products/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    userInfo,
    dispatch,
    history,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteUserHandler = (id) => {
    if (window.confirm("Are you sure ?")) {
      dispatch(deleteProduct(id));
      console.log("Product deleted.");
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
    console.log("Product created.");
  };

  return (
    <div>
      <div className='row align-items-center'>
        <div className='col'>
          <h1>Products : </h1>
        </div>
        <div className='col align-self-start d-grid'>
          <button
            onClick={createProductHandler}
            className='btn btn-primary my-3 mr-3'
          >
            Create Product
          </button>
        </div>
      </div>
      <h1>All Productss : </h1>
      {loadingDelete && <Loader />}
      {errorDelete && <Message varient='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message varient='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varient='danger'>{error}</Message>
      ) : (
        <table className='table table-hover table-bordered table-responsive table-md mx-auto'>
          <thead>
            <tr>
              <th>PRODUCT ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>OPTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button className='btn btn-light'>
                      <Link to={`/admin/products/${product._id}/edit`}>
                        Edit
                      </Link>
                    </button>
                    <button
                      type='button'
                      className='btn btn-dark'
                      onClick={() => deleteUserHandler(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <Paginatn pages={pages} page={page} isAdmin={true} />
    </div>
  );
};

export default ProductList;
