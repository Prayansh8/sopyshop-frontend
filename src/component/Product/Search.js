import React, { Fragment, useState } from "react";
import "./search.css";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    navigate(keyword.trim() ? `/products/${keyword}` : "/products");
  };
  return (
    <Fragment>
      <div className="searcher">
        <div className="searcherBox">
          <form
            className="searchBox"
            onSubmit={searchSubmitHandler}
            role="search"
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
