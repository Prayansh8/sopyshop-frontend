import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getSingleOrder } from "../../redux/actions/orderAction";
import { toast } from "react-toastify";
import { useParams, Link } from "react-router-dom";
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
  Divider, 
  Stack, 
  alpha, 
  useTheme,
  Chip
} from "@mui/material";
import { 
  LocalShipping, 
  Payment, 
  Inventory, 
} from "@mui/icons-material";
import { OrderSkeleton } from "../../components/common/SkeletonLoader";
import Metadata from "../../components/layout/Metadata";

const SingleOrder = ({ id: orderIdProp }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { id: paramsId } = useParams();
  const id = orderIdProp || paramsId;

  const { order, error, loading } = useSelector((state) => state.singleOrder);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (id) {
        dispatch(getSingleOrder(id));
    }
  }, [error, dispatch, id]);

  if (loading) return <OrderSkeleton />;
  if (!order || !order._id) return null;

  const shippingInfo = order.shippingInfo;

  return (
    <Fragment>
      <Metadata title={`Order Details #${order._id} | Sopyshop`} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 900, flexGrow: 1 }}>
              Order Details
            </Typography>
            <Chip 
              label={order.orderStatus} 
              color={order.orderStatus === 'Delivered' ? 'success' : 'warning'}
              sx={{ fontWeight: 900, borderRadius: 2, px: 1 }}
            />
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: -3, mb: 2 }}>
            Order ID: <b>#{order._id}</b>
          </Typography>

          <Grid container spacing={4}>
            {/* Left Column: Info */}
            <Grid item xs={12} lg={8}>
              <Stack spacing={4}>
                {/* Shipping Info Card */}
                <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <LocalShipping color="primary" /> Shipping Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" color="text.secondary">NAME</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700 }}>
                        {order.user?.firstName} {order.user?.lastName}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" color="text.secondary">PHONE</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700 }}>{shippingInfo?.phone}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="caption" color="text.secondary">ADDRESS</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {shippingInfo?.address}, {shippingInfo?.city}, {shippingInfo?.state}, {shippingInfo?.pinCode}, {shippingInfo?.country}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>

                {/* Order Items Card */}
                <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Inventory color="primary" /> Order Items
                  </Typography>
                  <Stack spacing={3}>
                    {order.orderItems?.map((item) => (
                      <Box key={item.product} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ width: 80, height: 80, borderRadius: 2, overflow: 'hidden', border: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                          <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="subtitle1" component={Link} to={`/product/${item.product}`} sx={{ fontWeight: 700, textDecoration: 'none', color: 'inherit', '&:hover': { color: 'primary.main' } }}>
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.quantity} x ₹{item.price.toLocaleString()}
                          </Typography>
                        </Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Paper>
              </Stack>
            </Grid>

            {/* Right Column: Payment & Summary */}
            <Grid item xs={12} lg={4}>
              <Stack spacing={4}>
                {/* Payment Info Card */}
                <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: alpha(theme.palette.primary.main, 0.02), border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}` }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Payment color="primary" /> Payment Status
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Box sx={{ 
                      width: 12, 
                      height: 12, 
                      borderRadius: '50%', 
                      bgcolor: order.paymentInfo?.status === "succeeded" ? "success.main" : "error.main" 
                    }} />
                    <Typography variant="h6" sx={{ fontWeight: 900, color: order.paymentInfo?.status === "succeeded" ? "success.main" : "error.main" }}>
                      {order.paymentInfo?.status === "succeeded" ? "PAID" : "UNPAID"}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Transaction ID: <br/><b>{order.paymentInfo?.id || 'N/A'}</b>
                  </Typography>
                </Paper>

                {/* Summary Card */}
                <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Order Summary</Typography>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="text.secondary">Subtotal</Typography>
                      <Typography sx={{ fontWeight: 600 }}>₹{order.itemPrice?.toLocaleString()}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="text.secondary">Shipping</Typography>
                      <Typography sx={{ fontWeight: 600 }}>₹{order.shippingPrice?.toLocaleString()}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="text.secondary">GST (18%)</Typography>
                      <Typography sx={{ fontWeight: 600 }}>₹{order.taxPrice?.toLocaleString()}</Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="h6" sx={{ fontWeight: 800 }}>Total</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 900, color: 'primary.main' }}>
                        ₹{order.totalPrice?.toLocaleString()}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Fragment>
  );
};

export default SingleOrder;
