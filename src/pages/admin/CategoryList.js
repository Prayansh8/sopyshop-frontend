import React, { useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
  deleteCategory,
  getCategories,
  clearErrors
} from "../../redux/actions/categoryAction";
import { toast } from "react-toastify";

const CategoryList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { categories, error } = useSelector((state) => state.categories);
  const { isDeleted } = useSelector((state) => state.categoryOperation);

  const deleteCategoryHandler = (id) => {
    dispatch(deleteCategory(id));
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Category Deleted");
    }
    dispatch(getCategories());
  }, [error, dispatch, isDeleted]);

  const columns = [
    { field: "id", headerName: "Category ID", flex: 1, minWidth: 200 },
    { field: "name", headerName: "Name", flex: 1.5, minWidth: 200 },
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
              to={`/admin/update/category/${params.id}`}
              size="small"
              sx={{ color: theme.palette.primary.main, bgcolor: alpha(theme.palette.primary.main, 0.1) }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => deleteCategoryHandler(params.id)}
              sx={{ color: theme.palette.error.main, bgcolor: alpha(theme.palette.error.main, 0.1) }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        );
      }
    },
  ];

  const rows = (categories || []).map((item) => ({
    id: item._id,
    name: item.name
  }));

  return (
    <AdminLayout title="Categories Management">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>All Categories</Typography>
        <Button
          component={Link}
          to={`/admin/create/category`}
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2, fontWeight: 700, px: 3 }}
        >
          Create Category
        </Button>
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

export default CategoryList;
