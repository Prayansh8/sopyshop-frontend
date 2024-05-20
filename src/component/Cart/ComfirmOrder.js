import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import CheckOutStep from "./CheckOutStep";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./ComfirmOrder.css";
import { useNavigate } from "react-router-dom";

const ComfirmOrder = () => {
  const navigate = useNavigate();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 60;
  const taxVal = subtotal * 0.18;
  const tax = Math.round(taxVal);
  const totalPrice = subtotal + shippingCharges + tax;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const procecedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/proccess/payment");
  };

  // useEffect(() => {
  //   window.safestPayVendorToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWViZmRhZjRhYWM4MTJkNDk4ODljOTEiLCJpYXQiOjE3MDk5NjY1MTV9.ylsBGjX36gLazTYpD8zmrIE4FvTXq7WH3dTtTZ0VGzE';
  //   window.safestPayMagicButtonId = '65ec68519934fa9ffdc3e0a1';
  //   const script = document.createElement("script");
  //   script.src = "https://cdn-safestpay.prayanshgupta.com/safest-payment-button.js";
  //   // script.src = "http://localhost:5500/dist/safest-payment-button.js"
  //   script.async = true;
  //   document.body.appendChild(script);
  // }, []);
  return (
    <>
      <Fragment>
        <div className="mainContOrd">
          <CheckOutStep aciveStap={1} />
          <div className="row sippingInfo">
            <div className="col-7 sippingInfo-right border-e">
              <div className="sippDetaild">
                <div className="sippHeding">
                  <Typography>Shipping Info</Typography>
                </div>
                <div className="sippInfoDetails">
                  <div className="sippInfoName addressDetails">
                    <p> Name: </p>
                    <div>
                      <span id="customer-name"> {shippingInfo.name} </span>
                    </div>
                  </div>
                  <div className="sippInfoPhone addressDetails">
                    <p> Phone: </p>
                    <div>
                      <span id="customer-phone"> {shippingInfo.phone} </span>
                    </div>
                  </div>
                  <div className="sippInfoAddress addressDetails">
                    <p> Address: </p>
                    <div>
                      <span>{address}</span>
                    </div>
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
            <div className="col-5 sippingInfo-left">
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
                    <div className="totalTextInOrder">
                      <p>
                        <b>total:</b>
                      </p>
                    </div>
                    <div className="totllPriceInOrd">
                      <span>₹<span id="product-amount">{totalPrice}</span></span>
                    </div>
                  </div>
                  <button className="ProccedBtn" onClick={procecedToPayment}>
                    Procced to Payment
                  </button>
                  {/* <div id="safest-pay-button-position"></div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default ComfirmOrder;
