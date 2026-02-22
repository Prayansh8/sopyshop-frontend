import React, { useEffect, useState } from "react";
import { deleteUserByAdmin, getAllUsers } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";

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
import { Delete as DeleteIcon, Edit as EditIcon, Security } from "@mui/icons-material";
import { toast } from "react-toastify";
import AdminUpdateUser from "./AdminUpdateUser";

const Users = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const theme = useTheme();
  const dispatch = useDispatch();
  const { users, error } = useSelector((state) => state.getAllUsers);
  const { isDeleted, message } = useSelector((state) => state.profile);

  const deleteUserHendeler = (id) => {
    dispatch(deleteUserByAdmin(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isDeleted) {
      toast.success(message || "User Deleted");
      dispatch({ type: "DELETE_USER_RESET" });
      dispatch(getAllUsers());
    } else {
      dispatch(getAllUsers());
    }
  }, [error, dispatch, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", flex: 1, minWidth: 220 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1.5, minWidth: 200 },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
      minWidth: 120,
      renderCell: (params) => {
        const isAdmin = params.value === 'admin';
        return (
          <Chip 
            icon={isAdmin ? <Security fontSize="small" /> : undefined}
            label={params.value} 
            color={isAdmin ? "primary" : "default"} 
            size="small" 
            sx={{ fontWeight: 600, textTransform: 'capitalize' }} 
          />
        );
      }
    },
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
              onClick={() => deleteUserHendeler(params.id)}
              sx={{ color: theme.palette.error.main, bgcolor: alpha(theme.palette.error.main, 0.1), width: 32, height: 32 }}
            >
              <DeleteIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        );
      }
    },
  ];

  const rows = (users || []).map((user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  }));

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary' }}>System Users</Typography>
      </Box>

      {openUpdate && selectedId && (
        <AdminUpdateUser 
          open={openUpdate} 
          handleClose={() => { setOpenUpdate(false); setSelectedId(""); }} 
          userId={selectedId} 
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

export default Users;
