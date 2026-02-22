import React, { useEffect, useState, Fragment } from "react";
import { CheckCircle } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { EMPTY_CART } from "../../redux/constants/cartConstant";
import Metadata from "../../components/layout/Metadata";
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  Stack,
  alpha,
  useTheme,
  Divider
} from "@mui/material";

const OrderSuccess = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Clear the cart from Redux and Local Storage
    dispatch({ type: EMPTY_CART });
    localStorage.setItem("cartItems", JSON.stringify([]));
    sessionStorage.removeItem("orderInfo");

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [dispatch, navigate]);

  return (
    <Fragment>
      <Metadata title={"Order Successful | Sopyshop"} />
      <Container maxWidth="sm" sx={{ py: 12 }}>
        <Paper 
          elevation={0}
          sx={{ 
            p: 6, 
            textAlign: 'center', 
            borderRadius: 6, 
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: `0 20px 60px ${alpha(theme.palette.common.black, 0.08)}`,
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Decorative background circle */}
          <Box sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: alpha(theme.palette.primary.main, 0.05),
            zIndex: 0
          }} />

          <Stack spacing={4} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ 
              width: 100, 
              height: 100, 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              bgcolor: alpha(theme.palette.success.main, 0.1),
              mb: 2
            }}>
              <CheckCircle sx={{ fontSize: 60, color: 'success.main' }} />
            </Box>

            <Box>
              <Typography variant="h3" sx={{ fontWeight: 900, mb: 1.5, letterSpacing: '-0.02em' }}>
                Order Placed!
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', fontWeight: 500 }}>
                Your order has been placed successfully. Thank you for shopping with us!
              </Typography>
            </Box>

            <Divider sx={{ width: '100%', my: 1 }} />

            <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
              <Button 
                fullWidth
                variant="outlined" 
                size="large"
                component={Link} 
                to="/orders"
                sx={{ 
                  py: 1.8, 
                  borderRadius: 3, 
                  fontWeight: 800,
                  fontSize: '1rem'
                }}
              >
                View Orders
              </Button>
              <Button 
                fullWidth
                variant="contained" 
                size="large"
                component={Link} 
                to="/"
                sx={{ 
                  py: 1.8, 
                  borderRadius: 3, 
                  fontWeight: 800,
                  fontSize: '1rem',
                  boxShadow: theme.shadows[4]
                }}
              >
                Continue Shopping
              </Button>
            </Stack>

            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              Redirecting to home page in <b>{countdown}</b> seconds...
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Fragment>
  );
};

export default OrderSuccess;
