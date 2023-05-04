import React, { Fragment } from "react";
import CartItemCard from "./CartItemCard.js";
import "./cart.css";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../actions/cartAction.js";

const Cart = () => {
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
  return (
    <Fragment>
      <div className="mainContainer">
        <div className="headingCont">
          <p className="p-headingCont">Product</p>
          <p className="q-headingCont">Quintity</p>
          <p className="s-headingCont">Subtotal</p>
        </div>

        {cartItems &&
          cartItems.map((item) => (
            <div className="itemsCont">
              <div className="cartItem">
                <CartItemCard item={item} />
              </div>
              <div className="itemQuintity">
                <button className="qtyminus"  onClick={() =>
                    minsQuintity(item.product, item.quantity)
                  }>-</button>
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
              <p className="p-price">{"₹600"}</p>
            </div>
          </div>
          <div className="checkoutCont">
            <button className="checkoutBtn">Checkout Now</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;
