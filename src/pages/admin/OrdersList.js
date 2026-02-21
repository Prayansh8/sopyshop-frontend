import React, { useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { 
  Box, 
  Typography, 
  IconButton, 
  useTheme, 
  Paper,
  alpha,
  Chip
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { toast } from "react-toastify";
import {
  clearErrors,
  deleteOrderByAdmin,
  getAllOrdersByAdmin
} from "../../redux/actions/orderAction";

const OrdersList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { orders, error } = useSelector((state) => state.orders);
  const { isDeleteded } = useSelector((state) => state.deleteOrder);

  const deleteOrderHendeler = (id) => {
    dispatch(deleteOrderByAdmin(id));
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleteded) {
      toast.success("Order Deleted");
    }
    dispatch(getAllOrdersByAdmin());
  }, [error, dispatch, isDeleteded]);

  const columns = [
    { field: "id", headerName: "Order ID", flex: 1, minWidth: 220 },
    { field: "user", headerName: "User ID", flex: 1, minWidth: 220 },
    {
      field: "orderStatus",
      headerName: "Status",
      flex: 0.5,
      minWidth: 120,
      renderCell: (params) => {
        let color = 'default';
        if (params.value === 'Processing') color = 'warning';
        if (params.value === 'Shipped') color = 'info';
        if (params.value === 'Delivered') color = 'success';
        return <Chip label={params.value} color={color} size="small" sx={{ fontWeight: 600 }} />;
      }
    },
    { field: "totalPrice", headerName: "Amount (₹)", type: "number", flex: 0.5, minWidth: 120 },
    {
      field: "action",
      headerName: "Actions",
      flex: 0.5,
      minWidth: 120,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              component={Link}
              to={`/admin/order/${params.id}`}
              size="small"
              sx={{ color: theme.palette.primary.main, bgcolor: alpha(theme.palette.primary.main, 0.1) }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => deleteOrderHendeler(params.id)}
              sx={{ color: theme.palette.error.main, bgcolor: alpha(theme.palette.error.main, 0.1) }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        );
      }
    },
  ];

  const rows = (orders || []).map((item) => ({
    id: item._id,
    user: item.user,
    orderStatus: item.orderStatus,
    totalPrice: item.totalPrice
  }));

  return (
    <AdminLayout title="Orders Management">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>All Orders</Typography>
      </Box>

      <Paper sx={{ width: '100%', height: 600, borderRadius: 2, overflow: 'hidden', boxShadow: theme.shadows[2] }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          disableRowSelectionOnClick
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell:focus': { outline: 'none' },
            '& .MuiDataGrid-columnHeaders': { bgcolor: alpha(theme.palette.primary.main, 0.05) }
          }}
        />
      </Paper>
    </AdminLayout>
  );
};

export default OrdersList;
