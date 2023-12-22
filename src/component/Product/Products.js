import React, { useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productAction";
import { useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import "./products.css";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Slider } from "@mui/material";
import MataData from "../layout/MataData";

export default function Products() {
  const categories = [
    "Clothes",
    "Shoes",
    "Phone",
    "Laptop",
    "Daskstop",
    "Jacket",
    "Camera",
  ];
  const { keyword } = useParams();
  const [price, setPrice] = useState([0, 150000]);
  const [category, setCategory] = useState();

  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const { products, loading, productsCount } = useSelector(
    (state) => state.products
  );

  const resultPerPage = 8;

  const handlePriceChange = (e, newPrice) => {
    setPrice(newPrice);
  };

  const setCountPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    dispatch(getProducts(keyword, price, currentPage, category));
  }, [dispatch, keyword, price, currentPage, category]);
  return (
    <Fragment>
      <MataData title={"Sopyshop-Products"} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="allProductsContainer">
            {/* Filter Bar */}
            <div className="sidewar">
              <div className="sidewarBox bg-dark w-100 h-100">
                <h1 className="filter-h">Filter</h1>
                <div className="fillterBox">
                  <div className="priceFilter">
                    <h2 className="price-h">Price</h2>
                    <div className="fillterBoxSlider">
                      <Slider
                        value={price}
                        onChange={handlePriceChange}
                        valueLabelDisplay="off"
                        aria-labelledby="range-slider"
                        min={0}
                        max={150000}
                      />
                    </div>
                  </div>
                  <div className="catogeryContainer">
                    <h2 className="cate-h">Categories</h2>
                    <ul className="catogeryBox">
                      {categories.map((category) => (
                        <li
                          key={category}
                          onClick={() => setCategory(category)}
                        >
                          {category}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mobileCatogeryContainer">
                    <h2 className="cate-h">Categories</h2>
                    <div className="selectCatogeries">
                      <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option>Choose Category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* All products */}
            <div className="productbar">
              <div className="container my-2">
                <h2 className="heading">Products</h2>
                <div className="cardProducts">
                  {products &&
                    products.map((item) => (
                      <div className="card-product" key={item._id}>
                        <ProductCard product={item} />
                      </div>
                    ))}
                </div>

                <div className="paginationBoc">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCountPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="First"
                    lastPageText="Last"
                    itemClass="itemClass"
                  />
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
