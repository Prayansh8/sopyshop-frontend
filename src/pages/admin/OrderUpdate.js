import React, { useEffect, useState } from "react";
import SingleOrder from "../orders/SingleOrder";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { adminUpdateOrder, clearErrors, getAllOrdersByAdmin } from "../../redux/actions/orderAction";
import { IconButton, Box, 
  Button, 
  Typography, 
  Paper, 
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  InputAdornment,
  Grid
} from "@mui/material";
import { AccountTree, LocalShipping , Close as CloseIcon
} from "@mui/icons-material";

const OrderUpdate = ({ open, handleClose, orderId }) => {
  const dispatch = useDispatch();
    const id = orderId;

  const { error, isUpdated } = useSelector((state) => state.updateOrder);
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

    dispatch(adminUpdateOrder(id, { status }));
  };

  useEffect(() => {
    if (error) {
       // Support both string errors and object errors with message property
      toast.error(typeof error === 'string' ? error : error.message || "An error occurred");
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Order Status Updated!");
      dispatch({ type: "UPDATE_ORDER_RESET" });
      dispatch(getAllOrdersByAdmin());
      handleClose();
    }
  }, [error, dispatch, isUpdated, handleClose]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth PaperProps={{ sx: { borderRadius: 3, boxShadow: 24, margin: 2 } }}>
      <DialogTitle sx={{ pt: 3, pb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          Manage Order {id}
        </Typography>
        <IconButton onClick={handleClose} sx={{ color: "text.secondary" }}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: { xs: 2, sm: 4, md: 5 }, bgcolor: "background.default" }}>
        <Box sx={{ mt: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 4, height: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, borderBottom: '1px solid #eee', pb: 2 }}>
                Order Details
              </Typography>
              <SingleOrder id={id} />
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
      </DialogContent>
    </Dialog>
  );
};

export default OrderUpdate;
