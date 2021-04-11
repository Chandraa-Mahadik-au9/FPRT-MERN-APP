import React, { useState } from "react";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  // console.log(history);

  const submitHandler = (event) => {
    event.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <form onSubmit={submitHandler} className='m-4'>
      <div className='input-group mb-3'>
        <input
          type='text'
          className='form-control'
          placeholder='Search your product here..'
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          className='btn btn-outline-primary'
          type='submit'
          id='button-addon2'
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;
