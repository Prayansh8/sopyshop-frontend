import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getSingleOrder } from "../../actions/orderAction";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./SingleOrder.css";

const SingleOrder = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { order, error } = useSelector((state) => state.singleOrder);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getSingleOrder(id));
  }, [error, dispatch, id]);

  return (
    <Fragment>
      <div className="OrderMainContainer">
        <div className="mainContSppinDetais">
          <div className="orderId">
            <p>Order #{order && order._id}</p>
          </div>

          {/* Shipping Info */}
          <div className="shippingInfo">
            <div className="shippingInfoText">
              <p>Shipping Info:</p>
            </div>
            <div className="detailsTable">
              <div className="dis-flex">
                <div className="disRight">
                  <p>Name</p>
                </div>
                <div className="disMid">
                  <span>-</span>
                </div>
                <div className="disLeft">
                  <span>{order.user && order.user.name}</span>
                </div>
              </div>
              <div className="dis-flex">
                <div className="disRight">
                  <p>Phone</p>
                </div>
                <div className="disMid">
                  <span>-</span>
                </div>
                <div className="disLeft">
                  <span>{order.shippingInfo && order.shippingInfo.phone}</span>
                </div>
              </div>
              <div className="dis-flex">
                <div className="disRight">
                  <p>Address</p>
                </div>
                <div className="disMid">
                  <span>-</span>
                </div>
                <div className="disLeft">
                  <span>
                    {order.shippingInfo &&
                      `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`}
                  </span>
                </div>
              </div>

              {/* Amount */}
              <div className="dis-flex">
                <div className="disRight">
                  <p>Amount</p>
                </div>
                <div className="disMid">
                  <span>-</span>
                </div>
                <div className="disLeft">
                  <span>₹{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              {/* payment */}
              <div className="dis-flex">
                <div className="disRight">
                  <p>Payment</p>
                </div>
                <div className="disMid">
                  <span>-</span>
                </div>
                <div className="disLeft">
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>
              </div>

              {/* Order Status */}
              <div className="dis-flex">
                <div className="disRight">
                  <p>Order Status:</p>
                </div>
                <div className="disMid">
                  <span>-</span>
                </div>
                <div className="disLeft">
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="orderItemsCont">
            <div className="orderItemsText">
              <p>Order Items:</p>
            </div>

            <div className="proOrder">
              {order.orderItems &&
                order.orderItems.map((item) => (
                  <div className="productD proOrderDet" key={item.product}>
                    <div className="imgPro ">
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
                        {item.quantity} x ₹{item.price} =
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SingleOrder;
