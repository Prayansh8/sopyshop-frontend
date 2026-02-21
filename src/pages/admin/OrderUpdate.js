import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import SingleOrder from "../orders/SingleOrder";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { adminUpdateOrder, clearErrors } from "../../redux/actions/orderAction";
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  TextField, 
  MenuItem,
  InputAdornment,
  Grid
} from "@mui/material";
import { AccountTree, LocalShipping } from "@mui/icons-material";

const OrderUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { error } = useSelector((state) => state.updateOrder);
  const { order } = useSelector((state) => state.singleOrder);

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (order && order._id === id) {
      setStatus(order.orderStatus);
    }
  }, [order, id]);

  const updateOrderSubmit = (e) => {
    e.preventDefault();
    if (!status) return;
    
    const formData = new FormData();
    formData.append("status", status);

    dispatch(adminUpdateOrder(id, formData));
    toast.success("Order Status Updated!");
    setTimeout(() => {
      navigate('/admin/orders');
    }, 2000);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  return (
    <AdminLayout title="Process Order">
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 4, height: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, borderBottom: '1px solid #eee', pb: 2 }}>
                Order Details
              </Typography>
              <SingleOrder />
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalShipping color="primary" /> Update Status
              </Typography>
              <form onSubmit={updateOrderSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      select
                      fullWidth
                      label="Order Status"
                      variant="outlined"
                      required
                      value={status || ""}
                      onChange={(e) => setStatus(e.target.value)}
                      disabled={order?.orderStatus === "Delivered"}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountTree color="action" />
                          </InputAdornment>
                        ),
                      }}
                    >
                      <MenuItem value="Processing" disabled={order?.orderStatus !== "Processing"}>Processing</MenuItem>
                      <MenuItem value="Shipped">Shipped</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={order?.orderStatus === "Delivered"}
                      sx={{ py: 1.5, fontWeight: 800, borderRadius: 2 }}
                    >
                      Process Status
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
};

export default OrderUpdate;
