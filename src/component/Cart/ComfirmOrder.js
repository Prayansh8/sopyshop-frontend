import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import CheckOutStep from "./CheckOutStep";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./ComfirmOrder.css";

const ComfirmOrder = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 60;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + shippingCharges + tax;

  const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pinCode},${shippingInfo.country}`;
  return (
    <Fragment>
      <div className="mainCont">
        <CheckOutStep aciveStap={1} />
        <div className="row">
          <div className="col-7 border-e">
            <div className="sippDetaild">
              <div className="sippHeding">
                <Typography>Shipping Info</Typography>
              </div>
              <div className="sippInfoDetails">
                <div className="sippInfoName addressDetails">
                  <p> Name: </p>
                  <span> {shippingInfo.name} </span>
                </div>
                <div className="sippInfoPhone addressDetails">
                  <p> Phone: </p>
                  <span> {shippingInfo.phoneNo} </span>
                </div>
                <div className="sippInfoAddress addressDetails">
                  <p> Address: </p>
                  <span> {address} </span>
                </div>
              </div>
            </div>

            <div className="productDetailOrder">
              <div className="sippHeding">
                <Typography>Your Cart Item</Typography>
              </div>
              <div className="productInfoDetails">
                {cartItems &&
                  cartItems.map((item) => (
                    <div className="productD" key={item.product}>
                      <div className="imgPro">
                        <img
                          className="productImgOrd"
                          src={item.image}
                          alt="Product"
                        />
                      </div>
                      <div className="productItem">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>
                      <div className="totalprice">
                        <span>
                          {item.quantity} x ₹{item.price} ={" "}
                          <b>₹{item.price * item.quantity}</b>
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="col-5">
            <div className="orderSummery">
              <div className="orderHeding">
                <Typography>Order Summery</Typography>
              </div>
              <div>
                <div className="totalDetailsCont">
                  <div className="totalDetails">
                    <p>Subtotal:</p>
                    <div>
                      <span>₹{subtotal}</span>
                    </div>
                  </div>
                  <div className="totalDetails">
                    <p>Shipping Charges:</p>
                    <div>
                      <span>₹{shippingCharges}</span>
                    </div>
                  </div>
                  <div className="totalDetails">
                    <p>GST:</p>
                    <div>
                      <span>₹{tax}</span>
                    </div>
                  </div>
                </div>
                <div className="totalP">
                  <p>
                    <b>total:</b>
                  </p>
                  <span>₹{totalPrice}</span>
                </div>
                <button className="ProccedBtn">Procced to Payment</button>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ComfirmOrder;
