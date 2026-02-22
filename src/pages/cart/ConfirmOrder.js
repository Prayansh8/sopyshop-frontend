import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import CheckOutStep from "../../components/cart/CheckOutStep";
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Divider,
  Button,
  Stack,
  alpha,
  useTheme
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Metadata from "../../components/layout/Metadata";

const ConfirmOrder = () => {
  const theme = useTheme();
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
    navigate("/process/payment");
  };

  return (
    <Fragment>
      <Metadata title={"Sopyshop | Confirm Order"} />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <CheckOutStep activeStep={1} />
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {/* Left Side: Shipping & Items */}
          <Grid item xs={12} md={8}>
            <Stack spacing={4}>
              {/* Shipping Info */}
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 4, 
                  borderRadius: 4, 
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}`
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 900, mb: 3, letterSpacing: '-0.01em' }}>
                  Shipping Information
                </Typography>
                <Box sx={{ ml: 1 }}>
                  <Stack spacing={1.5}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Typography variant="body1" sx={{ fontWeight: 800, minWidth: 100, color: 'text.secondary' }}>Name:</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>{shippingInfo.name}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Typography variant="body1" sx={{ fontWeight: 800, minWidth: 100, color: 'text.secondary' }}>Phone:</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>{shippingInfo.phone}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Typography variant="body1" sx={{ fontWeight: 800, minWidth: 100, color: 'text.secondary' }}>Address:</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>{address}</Typography>
                    </Box>
                  </Stack>
                </Box>
              </Paper>

              {/* Cart Items */}
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 4, 
                  borderRadius: 4, 
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}`
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 900, mb: 3, letterSpacing: '-0.01em' }}>
                  Your Order Items
                </Typography>
                <Stack spacing={2} divider={<Divider />}>
                  {cartItems && cartItems.map((item) => (
                    <Box 
                      key={item.product} 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        py: 1
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Box 
                          component="img"
                          src={item.image}
                          alt={item.name}
                          sx={{ 
                            width: 80, 
                            height: 80, 
                            objectFit: 'cover', 
                            borderRadius: 2,
                            boxShadow: theme.shadows[1]
                          }}
                        />
                        <Link 
                          to={`/product/${item.product}`}
                          style={{ textDecoration: 'none', color: theme.palette.text.primary }}
                        >
                          <Typography variant="body1" sx={{ fontWeight: 700, '&:hover': { color: 'primary.main' } }}>
                            {item.name}
                          </Typography>
                        </Link>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 700 }}>
                        {item.quantity} x ₹{item.price.toLocaleString()} = {" "}
                        <Box component="span" sx={{ color: 'primary.main', ml: 1 }}>
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </Box>
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Stack>
          </Grid>

          {/* Right Side: Order Summary */}
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                borderRadius: 4, 
                position: 'sticky',
                top: 100,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.08)}`,
                bgcolor: 'background.paper'
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 900, mb: 4, textAlign: 'center' }}>
                Order Summary
              </Typography>
              
              <Stack spacing={2.5}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.secondary' }}>Subtotal</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>₹{subtotal.toLocaleString()}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.secondary' }}>Shipping Charges</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>₹{shippingCharges}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.secondary' }}>GST (18%)</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>₹{tax.toLocaleString()}</Typography>
                </Box>
                
                <Divider sx={{ my: 1 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 900 }}>Total Price</Typography>
                  <Typography variant="h5" color="primary" sx={{ fontWeight: 900 }}>
                    ₹{totalPrice.toLocaleString()}
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={procecedToPayment}
                  sx={{ 
                    mt: 3, 
                    py: 2, 
                    borderRadius: 3, 
                    fontSize: '1.1rem', 
                    fontWeight: 900,
                    boxShadow: theme.shadows[6]
                  }}
                >
                  Proceed to Payment
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default ConfirmOrder;
