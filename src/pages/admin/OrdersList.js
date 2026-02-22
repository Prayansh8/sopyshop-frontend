import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {} from "react-router-dom";
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
import OrderUpdate from "./OrderUpdate";

const OrdersList = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const theme = useTheme();
  const dispatch = useDispatch();
  const { orders, error } = useSelector((state) => state.orders);
  const { isDeleted } = useSelector((state) => state.deleteOrder);

  const deleteOrderHendeler = (id) => {
    dispatch(deleteOrderByAdmin(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Order Deleted");
      dispatch({ type: "DELETE_ORDER_RESET" });
      dispatch(getAllOrdersByAdmin());
    } else {
      dispatch(getAllOrdersByAdmin());
    }
  }, [error, dispatch, isDeleted]);

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
          <Box sx={{ display: 'flex', gap: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <IconButton
              onClick={() => {
                setSelectedId(params.id);
                setOpenUpdate(true);
              }}
              size="small"
              sx={{ color: theme.palette.primary.main, bgcolor: alpha(theme.palette.primary.main, 0.1), width: 32, height: 32 }}
            >
              <EditIcon sx={{ fontSize: 18 }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => deleteOrderHendeler(params.id)}
              sx={{ color: theme.palette.error.main, bgcolor: alpha(theme.palette.error.main, 0.1), width: 32, height: 32 }}
            >
              <DeleteIcon sx={{ fontSize: 18 }} />
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
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary' }}>All Orders</Typography>
      </Box>

      {openUpdate && selectedId && (
        <OrderUpdate 
          open={openUpdate} 
          handleClose={() => { setOpenUpdate(false); setSelectedId(""); }} 
          orderId={selectedId} 
        />
      )}

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
    </>
  );
};

export default OrdersList;
