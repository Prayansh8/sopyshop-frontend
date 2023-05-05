import React, { Fragment } from "react";
import CartItemCard from "./CartItemCard.js";
import "./cart.css";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemToCart } from "../../actions/cartAction.js";
import MataData from "../layout/MataData";
import { useNavigate } from "react-router-dom";

const Cart = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const plusQuintity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemToCart(id, newQty));
  };

  const minsQuintity = (id, quantity, stock) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemToCart(id, newQty));
  };

  const deleteCartItem = (id) => {
    dispatch(removeItemToCart(id));
  };

  const checkOutHendler = () => {
    if (isAuthenticated) {
      navigate("/shipping");
    } else {
      navigate("/account");
    }
  };
  return (
    <Fragment>
      <MataData title={"Sopyshop-Cart"} />
      <div className="mainContainer">
        <div className="headingCont">
          <p className="p-headingCont">Product</p>
          <p className="q-headingCont">Quintity</p>
          <p className="s-headingCont">Subtotal</p>
        </div>

        {cartItems &&
          cartItems.map((item) => (
            <div className="itemsCont" key={item.product}>
              <div className="cartItem">
                <CartItemCard item={item} deleteCartItems={deleteCartItem} />
              </div>
              <div className="itemQuintity">
                <button
                  className="qtyminus"
                  onClick={() => minsQuintity(item.product, item.quantity)}
                >
                  -
                </button>
                <input
                  className="qty"
                  type="text"
                  value={item.quantity}
                  readOnly
                />
                <button
                  className="qtyplus"
                  onClick={() =>
                    plusQuintity(item.product, item.quantity, item.stock)
                  }
                >
                  +
                </button>
              </div>
              <p className="itemPrice">{`₹${item.price * item.quantity}`}</p>
            </div>
          ))}
        <div className="totlaCont">
          <div className="grossTotal">
            <div className="cartItem">
              <p className="total-H">Gross Total</p>
            </div>
            <div className="itemQuintity"></div>
            <div className="itemPrice">
              <p className="p-price">
                {`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}
              </p>
            </div>
          </div>
          <div className="checkoutCont">
            <button className="checkoutBtn" onClick={checkOutHendler}>
              Checkout Now
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;
