import React, { Fragment, useEffect, useRef } from "react";
import CheckOutStep from "../../components/cart/CheckOutStep";
import { useSelector, useDispatch } from "react-redux";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { config } from "../../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CreditCard, Event, VpnKey } from "@mui/icons-material";
import { clearErrors, createOrder } from "../../redux/actions/orderAction";
import Metadata from "../../components/layout/Metadata";
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  Stack,
  alpha,
  useTheme
} from "@mui/material";

const PaymentProcess = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.loadUser);
  const user = userInfo?.user;
  const { error } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (!orderInfo) {
      navigate("/cart");
      toast.error("Session expired, please try again");
    }
  }, [orderInfo, navigate]);

  const paymentData = {
    amount: Math.round((orderInfo?.totalPrice || 0) * 100) 
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemPrice: orderInfo?.subtotal,
    taxPrice: orderInfo?.tax,
    shippingPrice: orderInfo?.shippingCharges,
    totalPrice: orderInfo?.totalPrice 
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      const token = localStorage.getItem("sopyshop-token");
      const configData = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}` 
        } 
      };
      
      const response = await axios.post(
        `${config.baseUrl}/api/v1/payment/process`,
        paymentData,
        configData
      );
      
      const { clientSecret } = response.data;

      if (!stripe || !elements) return;

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: `${user?.firstName} ${user?.lastName}`,
              email: user?.email,
              address: {
                line1: shippingInfo?.address,
                city: shippingInfo?.city,
                state: shippingInfo?.state,
                postal_code: shippingInfo?.pinCode,
                country: shippingInfo?.country 
              },
              phone: shippingInfo?.phone 
            } 
          } 
        }
      );

      if (error) {
        payBtn.current.disabled = false;
        toast.error(error.message);
      } else {
        if (paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: paymentIntent.id,
            status: paymentIntent.status 
          };
          navigate("/success");
          dispatch(createOrder(order));
        } else {
          toast.error("There's an issue while processing the payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const stripeElementStyle = {
    style: {
      base: {
        fontSize: '16px',
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
        '::placeholder': {
          color: theme.palette.text.disabled,
        },
      },
      invalid: {
        color: theme.palette.error.main,
      },
    },
  };

  return (
    <Fragment>
      <Metadata title={"Sopyshop | Secure Payment"} />
      <Container maxWidth="md" sx={{ py: 8 }}>
        <CheckOutStep activeStep={2} />
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 3, md: 6 }, 
              borderRadius: 4, 
              width: '100%',
              maxWidth: 500,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.05)}`,
              bgcolor: 'background.paper'
            }}
          >
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 900, 
                mb: 4, 
                textAlign: 'center',
                color: 'text.primary'
              }}
            >
              Card Information
            </Typography>

            <form onSubmit={submitHandler}>
              <Stack spacing={3}>
                <Box sx={{ position: 'relative' }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    p: 2, 
                    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`, 
                    borderRadius: 2,
                    '&:focus-within': {
                      borderColor: 'primary.main',
                      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`
                    }
                  }}>
                    <CreditCard sx={{ color: 'primary.main', mr: 2 }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <CardNumberElement options={stripeElementStyle} />
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box sx={{ 
                    flexGrow: 1,
                    display: 'flex', 
                    alignItems: 'center', 
                    p: 2, 
                    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`, 
                    borderRadius: 2,
                    '&:focus-within': {
                      borderColor: 'primary.main',
                      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`
                    }
                  }}>
                    <Event sx={{ color: 'primary.main', mr: 2 }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <CardExpiryElement options={stripeElementStyle} />
                    </Box>
                  </Box>

                  <Box sx={{ 
                    flexGrow: 1,
                    display: 'flex', 
                    alignItems: 'center', 
                    p: 2, 
                    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`, 
                    borderRadius: 2,
                    '&:focus-within': {
                      borderColor: 'primary.main',
                      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`
                    }
                  }}>
                    <VpnKey sx={{ color: 'primary.main', mr: 2 }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <CardCvcElement options={stripeElementStyle} />
                    </Box>
                  </Box>
                </Box>

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  ref={payBtn}
                  sx={{ 
                    mt: 2, 
                    py: 2, 
                    borderRadius: 3, 
                    fontSize: '1.1rem', 
                    fontWeight: 900,
                    boxShadow: theme.shadows[8]
                  }}
                >
                  Pay Now - ₹{orderInfo?.totalPrice.toLocaleString()}
                </Button>
              </Stack>
            </form>
          </Paper>
        </Box>
      </Container>
    </Fragment>
  );
};

export default PaymentProcess;
