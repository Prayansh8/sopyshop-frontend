import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DataGrid } from "@mui/x-data-grid";
import { 
  Box, 
  Button, 
  Typography, 
  IconButton, 
  useTheme, 
  Paper,
  alpha
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from "@mui/icons-material";
import {
  deleteProduct,
  getAdminProducts,
  clearErrors
} from "../../redux/actions/productAction";
import { toast } from "react-toastify";
import ProductFormModal from "./ProductFormModal";

const ProductList = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const theme = useTheme();
  const dispatch = useDispatch();
  const { products, error } = useSelector((state) => state.products);
  const { isDeleted } = useSelector((state) => state.deleteProduct);

  const deleteProductHendeler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Product Deleted");
      dispatch({ type: "DELETE_PRODUCTS_RESET" });
      dispatch(getAdminProducts());
    } else {
      dispatch(getAdminProducts());
    }
  }, [error, dispatch, isDeleted]);

  const columns = [
    { field: "id", headerName: "Product ID", flex: 1, minWidth: 200 },
    { field: "name", headerName: "Name", flex: 1.5, minWidth: 200 },
    { field: "stock", headerName: "Stock", type: "number", flex: 0.5, minWidth: 100 },
    { field: "price", headerName: "Price (₹)", type: "number", flex: 0.5, minWidth: 100 },
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
              onClick={() => deleteProductHendeler(params.id)}
              sx={{ color: theme.palette.error.main, bgcolor: alpha(theme.palette.error.main, 0.1), width: 32, height: 32 }}
            >
              <DeleteIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        );
      }
    },
  ];

  const rows = (products || []).map((item) => ({
    id: item._id,
    stock: item.stock,
    price: item.price,
    name: item.name
  }));

  return (
    <>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary' }}>All Products</Typography>
        <Button
          onClick={() => setOpenCreate(true)}
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2, fontWeight: 700, px: 3 }}
        >
          Create Product
        </Button>
      </Box>
      
      <ProductFormModal open={openCreate} handleClose={() => setOpenCreate(false)} />
      {openUpdate && selectedId && (
        <ProductFormModal 
          open={openUpdate} 
          handleClose={() => { setOpenUpdate(false); setSelectedId(""); }} 
          productId={selectedId} 
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

export default ProductList;
