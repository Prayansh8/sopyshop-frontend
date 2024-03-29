import React, { Fragment, useEffect, useRef } from "react";
import CheckOutStep from "./CheckOutStep";
import { useSelector, useDispatch } from "react-redux";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { config } from "../../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CreditCard, Event, VpnKey } from "@mui/icons-material";
import "./PaymentProcess.css";
import { clearErrors, createOrder } from "../../actions/orderAction";

const PaymentProcess = () => {
  const dispatch = useDispatch();

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.loadUser);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const token = localStorage.getItem("token");
      const configData = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${config.baseUrl}/api/v1/payment/process`,
        paymentData,
        configData
      );
      const { clientSecret } = response.data;

      if (!stripe || !elements) {
        return;
      }
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement),

            billing_details: {
              name: user.name,
              email: user.email,
              address: {
                line1: shippingInfo.address,
                city: shippingInfo.city,
                state: shippingInfo.state,
                postal_code: shippingInfo.pinCode,
                country: shippingInfo.country,
              },
              phone: shippingInfo.phone,
            },
          },
        }
      );
      if (error) {
        payBtn.current.disabled = false;
        toast.error(error.message);
      } else {
        if (paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: paymentIntent.id,
            status: paymentIntent.status,
          };
          navigate("/success");
          dispatch(createOrder(order));
        } else {
          toast.error("There's an issue while processing the payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    toast.error(error);
    dispatch(clearErrors());
  }, [dispatch, error]);

  return (
    <Fragment>
      <div className="mainContPaymt">
        <CheckOutStep aciveStap={2} />
        <div className="paymentContainer">
          <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
            <div>
              <h2 className="border-bottom text-center p-2">Card Info</h2>
              <div>
                <CreditCard />
                <CardNumberElement className="paymentInput" />
              </div>
              <div>
                <Event />
                <CardExpiryElement className="paymentInput" />
              </div>
              <div>
                <VpnKey />
                <CardCvcElement className="paymentInput" />
              </div>
              <input
                type="submit"
                value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                ref={payBtn}
                className="paymentBtn"
              />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default PaymentProcess;
