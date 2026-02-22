import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {} from "react-router-dom";
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
import CategoryCreate from "./CategoryCreate";
import CategoryUpdate from "./CategoryUpdate";

const CategoryList = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const theme = useTheme();
  const dispatch = useDispatch();
  const { categories, error } = useSelector((state) => state.categories);
  const { isDeleted } = useSelector((state) => state.categoryOperation);

  const deleteCategoryHandler = (id) => {
    dispatch(deleteCategory(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Category Deleted");
      dispatch({ type: "DELETE_CATEGORY_RESET" });
      dispatch(getCategories());
    } else {
      dispatch(getCategories());
    }
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
              onClick={() => deleteCategoryHandler(params.id)}
              sx={{ color: theme.palette.error.main, bgcolor: alpha(theme.palette.error.main, 0.1), width: 32, height: 32 }}
            >
              <DeleteIcon sx={{ fontSize: 18 }} />
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
    <>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary' }}>All Categories</Typography>
        <Button
          onClick={() => setOpenCreate(true)}
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2, fontWeight: 700, px: 3 }}
        >
          Create Category
        </Button>
      </Box>

      <CategoryCreate open={openCreate} handleClose={() => setOpenCreate(false)} />
      {openUpdate && selectedId && (
        <CategoryUpdate 
          open={openUpdate} 
          handleClose={() => { setOpenUpdate(false); setSelectedId(""); }} 
          categoryId={selectedId} 
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

export default CategoryList;
