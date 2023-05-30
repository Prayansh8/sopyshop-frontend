import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

export default function ProductCard({ product }) {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };
  return (
    <Link className="text-decoration-none" to={`/product/${product._id}`}>
      <div className="productCard">
        <div className="productImage">
          <img
            className="card-img-top"
            src={product.images[0].url}
            alt={product.name}
          />
        </div>
        <div className="cardBody">
          <p className="cardTitle">{product.name}</p>
          <div className="productStars">
            <ReactStars {...options} />
            <span className="reviews">({product.numOfReviews} Reviews)</span>
          </div>
          <p className="cardPrice">{`₹${product.price}`}</p>
        </div>
      </div>
    </Link>
  );
}
