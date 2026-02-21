import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import {
  adminUpdateUserRole,
  clearErrors,
  getUserDetails,
} from "../../redux/actions/userAction";
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
import { Email as EmailIcon, VerifiedUser, Security } from "@mui/icons-material";

const AdminUpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, error } = useSelector((state) => state.updateUser);
  const { user } = useSelector((state) => state.userDetails);

  const [username, setusername] = useState("");
  const [role, setRole] = useState("");

  const updateProductSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", role);
    formData.append("username", username);

    dispatch(adminUpdateUserRole(id, formData));
    toast.success("User Role Updated Successfully!");
    setTimeout(() => {
      navigate('/admin/users');
    }, 2000);
  };

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setRole(user.role || "");
      setusername(user.name || user.username || "");
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, user, id]);

  return (
    <AdminLayout title="Update User Info">
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 800, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <Security color="primary" /> Manage User Role
          </Typography>

          <form onSubmit={updateProductSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  required
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  inputProps={{ minLength: 1, maxLength: 32 }}
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  helperText="Usernames cannot be changed here."
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Role"
                  variant="outlined"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VerifiedUser color="action" />
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading ? true : false}
                  sx={{ py: 1.5, fontWeight: 800, borderRadius: 2 }}
                >
                  Update User
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default AdminUpdateUser;
