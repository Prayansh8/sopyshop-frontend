import React from "react";
import { Link } from "react-router-dom";
import "./CartItemCard.css";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="cartItemMain">
      <div className="cartItemCont">
        <div className="cartImgCont">
          <img src={item.image} alt="ssa" />
        </div>
        <div className="cartListCont">
          <div className="productName">
            <Link to={`/product/${item.product}`}>{item.name}</Link>
          </div>
          <span>{`Price: ₹${item.price}`}</span>
          <p
            onClick={() => deleteCartItems(item.product)}
            className="removeBtn"
          >
            Remove
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
