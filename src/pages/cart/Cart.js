import React, { Fragment } from "react";
import CartItemCard from "../../components/cart/CartItemCard";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemToCart } from "../../redux/actions/cartAction";
import Metadata from "../../components/layout/Metadata";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  Box, 
   
  Typography, 
  Grid, 
  Button, 
  IconButton, 
  Paper, 
  Divider, 
  Stack, 
  useTheme, 
  alpha 
} from "@mui/material";
import { Add, Remove, ShoppingCartCheckout, DeleteOutline } from "@mui/icons-material";

const Cart = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const plusQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemToCart(id, newQty));
  };

  const minusQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemToCart(id, newQty));
  };

  const deleteCartItem = (id) => {
    dispatch(removeItemToCart(id));
    toast.info("Item removed from cart");
  };

  const checkOutHandler = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      navigate("/products");
    } else {
      if (isAuthenticated === true) {
        navigate("/shipping");
      } else {
        navigate("/login?redirect=shipping");
      }
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <Fragment>
      <Metadata title={"Shopping Cart | Sopyshop"} />
      <Box sx={{ bgcolor: "background.default", py: 8, minHeight: "100vh" }}>
        <Box maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 6, textAlign: 'center' }}>
            Your Shopping Cart
          </Typography>

          {cartItems.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 10 }}>
              <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
                Your cart is empty
              </Typography>
              <Button variant="contained" size="large" onClick={() => navigate("/products")}>
                View Products
              </Button>
            </Box>
          ) : (
            <Grid container spacing={4}>
              {/* Cart Items List */}
              <Grid item xs={12} md={8}>
                <Paper elevation={0} sx={{ border: `1px solid ${alpha(theme.palette.divider, 0.1)}`, borderRadius: 4, overflow: 'hidden' }}>
                  {/* Header Row */}
                  <Box sx={{ display: { xs: 'none', sm: 'flex' }, bgcolor: alpha(theme.palette.primary.main, 0.05), p: 2, fontWeight: 700 }}>
                    <Typography sx={{ flex: 2 }}>Product</Typography>
                    <Typography sx={{ flex: 1, textAlign: 'center' }}>Quantity</Typography>
                    <Typography sx={{ flex: 1, textAlign: 'right' }}>Subtotal</Typography>
                  </Box>

                  {cartItems.map((item) => (
                    <Box key={item.product} sx={{ p: 2, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                      <Grid container alignItems="center">
                        <Grid item xs={12} sm={6}>
                          <CartItemCard item={item} deleteCartItems={deleteCartItem} />
                        </Grid>
                        
                        <Grid item xs={6} sm={3}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: alpha(theme.palette.divider, 0.05), borderRadius: 2, p: 0.5, mx: 'auto', width: 'fit-content' }}>
                            <IconButton size="small" onClick={() => minusQuantity(item.product, item.quantity)} color="primary">
                              <Remove fontSize="small" />
                            </IconButton>
                            <Typography sx={{ width: 30, textAlign: 'center', fontWeight: 700 }}>
                              {item.quantity}
                            </Typography>
                            <IconButton size="small" onClick={() => plusQuantity(item.product, item.quantity, item.stock)} color="primary">
                              <Add fontSize="small" />
                            </IconButton>
                          </Box>
                        </Grid>

                        <Grid item xs={6} sm={3} sx={{ textAlign: 'right' }}>
                          <Typography variant="h6" sx={{ fontWeight: 800, color: theme.palette.primary.main }}>
                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                          </Typography>
                          <IconButton size="small" color="error" onClick={() => deleteCartItem(item.product)} sx={{ display: { sm: 'none' }, mt: 1 }}>
                            <DeleteOutline />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                </Paper>
              </Grid>

              {/* Order Summary */}
              <Grid item xs={12} md={4}>
                <Paper elevation={0} sx={{ p: 4, border: `1px solid ${alpha(theme.palette.divider, 0.1)}`, borderRadius: 4, bgcolor: "background.paper", position: 'sticky', top: 100 }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>
                    Order Summary
                  </Typography>

                  <Stack spacing={2} sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="text.secondary">Gross Total</Typography>
                      <Typography sx={{ fontWeight: 700 }}>₹{subtotal.toLocaleString("en-IN")}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="text.secondary">Estimated Shipping</Typography>
                      <Typography color="success.main" sx={{ fontWeight: 700 }}>Free</Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="h5" sx={{ fontWeight: 800 }}>Total</Typography>
                      <Typography variant="h5" color="primary" sx={{ fontWeight: 800 }}>
                        ₹{subtotal.toLocaleString("en-IN")}
                      </Typography>
                    </Box>
                  </Stack>

                  <Button 
                    variant="contained" 
                    fullWidth 
                    size="large" 
                    startIcon={<ShoppingCartCheckout />}
                    onClick={checkOutHandler}
                    sx={{ py: 2, fontWeight: 800 }}
                  >
                    Checkout Now
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </Fragment>
  );
};

export default Cart;
