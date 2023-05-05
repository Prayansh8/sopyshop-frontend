import React, { useEffect } from "react";
import "./Home.css";
import ProductCard from "./ProductCard";
import { CgMouse } from "react-icons/cg";
import MataData from "../layout/MataData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";

export const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <MataData title={"Sopyshop"} />
          <div className="banner">
            <h1>Wellcome to Sopyshop</h1>
            <p>Find Amazing product blow</p>
            <a href="#product">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <div className="f-product" id="product">
            <h1>Feature product</h1>
            <div className="container productCardsContainer">
              {products &&
                products.map((item) => (
                  <div className="card-product" key={item._id}>
                    <ProductCard product={item} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
