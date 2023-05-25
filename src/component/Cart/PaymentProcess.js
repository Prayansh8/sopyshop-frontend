import React, { Fragment, useRef } from "react";
import CheckOutStep from "./CheckOutStep";
import { useDispatch, useSelector } from "react-redux";
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

const PaymentProcess = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.loadUser);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
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
            },
          },
        }
      );
      if (error) {
        payBtn.current.disabled = false;
        toast.error(error.message);
      } else {
        if (paymentIntent.status === "succeeded") {
          navigate("/success");
        } else {
          toast.error("there's some issue while proccessing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    }
  };

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default PaymentProcess;
