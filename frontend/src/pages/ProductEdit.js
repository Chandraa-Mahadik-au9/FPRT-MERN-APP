import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import FormContainer from "../components/FormContainer.js";
import {
  listProductDetails,
  updateProduct,
} from "../actions/productActions.js";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants.js";

const ProductEdit = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [merchant, setMerchant] = useState("");
  const [countInStock, setCountInStock] = useState(10);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({
        type: PRODUCT_UPDATE_RESET,
      });
      history.push("/admin/productslist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setDiscountPrice(product.discountPrice);
        setImage(product.image);
        setDescription(product.description);
        setCategory(product.category);
        setBrand(product.brand);
        setMerchant(product.merchant);
        setCountInStock(product.countInStock);
      }
    }
  }, [successUpdate, history, product, productId, dispatch]);

  const uploadFileHandler = async (event) => {
    const file = event.target.files[0];
    
    console.log(file);

    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/uploads", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        discountPrice,
        image,
        description,
        category,
        brand,
        merchant,
        countInStock,
      })
    );
    history.push("/admin/productslist");
  };

  return (
    <>
      <Link to='/admin/productslist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product : </h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message varient='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message varient='danger'>{error}</Message>
        ) : (
          <form onSubmit={submitHandler}>
            <div className='mb-3'>
              <label htmlFor='exampleInputName1' className='form-label'>
                Name :{" "}
              </label>
              <input
                type='name'
                className='form-control'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                id='exampleInputName1'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='exampleInputPrice1' className='form-label'>
                Price :{" "}
              </label>
              <input
                type='number'
                className='form-control'
                placeholder='Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                id='exampleInputPrice1'
              />
            </div>
            <div className='mb-3'>
              <label
                htmlFor='exampleInputDiscountPrice1'
                className='form-label'
              >
                Discount Price :{" "}
              </label>
              <input
                type='number'
                className='form-control'
                placeholder='Discount Price'
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                id='exampleInputDiscountPrice1'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='exampleInputImage1' className='form-label'>
                Image URL :{" "}
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Image URL'
                value={image}
                onChange={(e) => setImage(e.target.value)}
                id='exampleInputImage1'
              />
              <div className='form-group'>
                <label htmlFor='exampleFormControlFile1'>
                  OR Upload the image directly
                </label>
                <input
                  type='file'
                  name='image'
                  onChange={uploadFileHandler}
                  className='form-control-file'
                  id='exampleFormControlFile1'
                />
              </div>
              {uploading && <Loader />}
            </div>
            <div className='mb-3'>
              <label htmlFor='exampleInputDescription1' className='form-label'>
                Description :{" "}
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Description of product'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id='exampleInputDescription1'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='exampleInputCategory1' className='form-label'>
                Category :{" "}
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                id='exampleInputCategory1'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='exampleInputBrand1' className='form-label'>
                Brand :{" "}
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                id='exampleInputBrand1'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='exampleInputMerchant1' className='form-label'>
                Merchant :{" "}
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Merchant'
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
                id='exampleInputMerchant1'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='exampleInputCount1' className='form-label'>
                Count In Stock :{" "}
              </label>
              <input
                type='number'
                className='form-control'
                placeholder='Count'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                id='exampleInputCount1'
              />
            </div>
            <button type='submit' className='btn btn-primary'>
              Update
            </button>
          </form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEdit;
