import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemToCart } from "../../redux/actions/cartAction";
import Metadata from "../../components/layout/Metadata";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Typography,
  Grid,
  Button,
  IconButton,
  Divider,
  Stack,
  useTheme,
  alpha,
  Container,
  Breadcrumbs,
  Chip,
  Avatar,
} from "@mui/material";
import { 
  Add, 
  Remove, 
  ShoppingCartCheckout, 
  DeleteOutline, 
  ChevronRight,
  ShoppingBagOutlined,
  ArrowBackIosNew,
  SecurityOutlined,
  LocalShippingOutlined
} from "@mui/icons-material";

const Cart = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const plusQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) return;
    dispatch(addItemToCart(id, newQty));
  };

  const minusQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) return;
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
      <Box sx={{ bgcolor: "background.default", flex: 1, pb: 10 }}>
        {/* Minimalist Top Nav */}
        <Box sx={{ borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`, bgcolor: 'background.paper', py: 1.5, mb: 4 }}>
          <Container maxWidth="xl">
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Breadcrumbs separator={<ChevronRight sx={{ fontSize: 14 }} />}>
                <Typography component={Link} to="/" sx={{ color: 'text.secondary', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, '&:hover': { color: 'primary.main' } }}>
                  SHOP
                </Typography>
                <Typography sx={{ fontWeight: 800, fontSize: '0.8rem', color: 'primary.main' }}>MY BAG</Typography>
              </Breadcrumbs>
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', letterSpacing: 1 }}>
                01 REVIEW BAG — 02 SHIPPING — 03 PAYMENT
              </Typography>
            </Stack>
          </Container>
        </Box>

        <Container maxWidth="xl">
          <Box sx={{ mb: 5 }}>
            <Stack direction="row" alignItems="baseline" spacing={2}>
              <Typography variant="h2" sx={{ fontWeight: 950, letterSpacing: '-0.04em' }}>
                Shopping Bag
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                ({cartItems.length} items)
              </Typography>
            </Stack>
          </Box>

          {cartItems.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 15 }}>
              <ShoppingBagOutlined sx={{ fontSize: 80, color: 'text.disabled', mb: 3, opacity: 0.2 }} />
              <Typography variant="h4" sx={{ fontWeight: 900, mb: 2 }}>Your bag is currently empty.</Typography>
              <Button 
                variant="contained" 
                onClick={() => navigate("/products")}
                sx={{ borderRadius: 0, px: 6, py: 2, fontWeight: 900, fontSize: '0.9rem' }}
              >
                RETURN TO SHOP
              </Button>
            </Box>
          ) : (
            <Grid container spacing={8}>
              {/* Product List - Linear Style */}
              <Grid item xs={12} lg={8}>
                <Box sx={{ borderTop: `1px solid ${theme.palette.divider}` }}>
                  {cartItems.map((item) => (
                    <Box 
                      key={item.product}
                      sx={{ 
                        py: 4, 
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                        display: 'flex',
                        gap: 4
                      }}
                    >
                      {/* Product Image */}
                      <Box 
                        sx={{ 
                          width: { xs: 100, sm: 160 }, 
                          height: { xs: 120, sm: 190 }, 
                          bgcolor: alpha(theme.palette.divider, 0.03),
                          borderRadius: 1,
                          overflow: 'hidden',
                          flexShrink: 0
                        }}
                      >
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      </Box>

                      {/* Product Details */}
                      <Box sx={{ flex: 1 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                          <Box>
                            <Typography 
                              variant="h5" 
                              component={Link} 
                              to={`/product/${item.product}`}
                              sx={{ 
                                fontWeight: 900, 
                                textDecoration: 'none', 
                                color: 'text.primary',
                                display: 'block',
                                mb: 0.5,
                                '&:hover': { color: 'primary.main' }
                              }}
                            >
                              {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                              ID: {item.product.slice(-6)}
                            </Typography>
                          </Box>
                          <Typography variant="h5" sx={{ fontWeight: 950 }}>
                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                          </Typography>
                        </Stack>

                        <Typography variant="body2" sx={{ mb: 4, color: 'success.main', fontWeight: 700 }}>
                          Item in stock
                        </Typography>

                        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 'auto' }}>
                          <Box sx={{ 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 1
                          }}>
                            <IconButton size="small" onClick={() => minusQuantity(item.product, item.quantity)} sx={{ borderRadius: 0, p: 1 }}>
                              <Remove fontSize="small" />
                            </IconButton>
                            <Typography sx={{ width: 40, textAlign: 'center', fontWeight: 800 }}>{item.quantity}</Typography>
                            <IconButton size="small" onClick={() => plusQuantity(item.product, item.quantity, item.stock)} sx={{ borderRadius: 0, p: 1 }}>
                              <Add fontSize="small" />
                            </IconButton>
                          </Box>

                          <Button 
                            startIcon={<DeleteOutline />} 
                            onClick={() => deleteCartItem(item.product)}
                            sx={{ color: 'text.secondary', fontWeight: 700, '&:hover': { color: 'error.main' } }}
                          >
                            Remove
                          </Button>
                        </Stack>
                      </Box>
                    </Box>
                  ))}
                </Box>
                
                <Button 
                  startIcon={<ArrowBackIosNew fontSize="small" />} 
                  onClick={() => navigate("/products")}
                  sx={{ mt: 4, fontWeight: 800, color: 'text.primary' }}
                >
                  CONTINUE SHOPPING
                </Button>
              </Grid>

              {/* Order Summary - Sharp Side Panel */}
              <Grid item xs={12} lg={4}>
                <Box sx={{ position: 'sticky', top: 40 }}>
                  <Typography variant="h4" sx={{ fontWeight: 950, mb: 4, letterSpacing: '-0.02em' }}>
                    Summary
                  </Typography>

                  <Stack spacing={2.5} sx={{ mb: 5 }}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography color="text.secondary" sx={{ fontWeight: 600 }}>Subtotal</Typography>
                      <Typography sx={{ fontWeight: 800 }}>₹{subtotal.toLocaleString("en-IN")}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography color="text.secondary" sx={{ fontWeight: 600 }}>Estimated Shipping</Typography>
                      <Typography color="success.main" sx={{ fontWeight: 800 }}>FREE</Typography>
                    </Stack>
                    <Divider sx={{ my: 1 }} />
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="h5" sx={{ fontWeight: 950 }}>Total</Typography>
                      <Typography variant="h4" sx={{ fontWeight: 950, color: 'primary.main' }}>
                        ₹{subtotal.toLocaleString("en-IN")}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    endIcon={<ChevronRight />}
                    onClick={checkOutHandler}
                    sx={{ 
                      py: 2.5, 
                      borderRadius: 1, 
                      fontWeight: 900, 
                      fontSize: '1rem',
                      letterSpacing: 1,
                      boxShadow: 'none',
                      '&:hover': { boxShadow: theme.shadows[4] }
                    }}
                  >
                    CHECKOUT NOW
                  </Button>

                  <Box sx={{ mt: 6 }}>
                    <Stack spacing={3}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <LocalShippingOutlined sx={{ color: 'text.secondary' }} />
                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase' }}>
                          Standard Delivery: Free over ₹999
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <SecurityOutlined sx={{ color: 'text.secondary' }} />
                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase' }}>
                          Secure Payment Guarantee
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>
    </Fragment>
  );
};

export default Cart;
