import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  adminUpdateUserRole,
  clearErrors,
  getUserDetails,
  getAllUsers,
} from "../../redux/actions/userAction";
import { IconButton, 
  Button, 
  Typography, 
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  InputAdornment,
  Grid
} from "@mui/material";
import { Email as EmailIcon, VerifiedUser, Security , Close as CloseIcon
} from "@mui/icons-material";

const AdminUpdateUser = ({ open, handleClose, userId }) => {
  const dispatch = useDispatch();
    const id = userId;

  const { loading, error, isUpdated } = useSelector((state) => state.updateUser);
  const { user } = useSelector((state) => state.userDetails);

  const [username, setusername] = useState("");
  const [role, setRole] = useState("");

  const updateProductSubmit = (e) => {
    e.preventDefault();
    if (!role) {
      toast.error("Please select a role");
      return;
    }
    const formData = new FormData();
    formData.append("role", role);
    formData.append("username", username);

    dispatch(adminUpdateUserRole(id, formData));
  };

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else if (user) {
      setRole(user.role || "");
      setusername(user.name || user.username || "");
    }

    if (error) {
       // Support both string errors and object errors with message property
      toast.error(typeof error === 'string' ? error : error.message || "An error occurred");
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("User Role Updated Successfully!");
      dispatch({ type: "UPDATE_USER_RESET" });
      dispatch(getAllUsers());
      handleClose();
    }
  }, [error, dispatch, user, id, isUpdated, handleClose]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3, boxShadow: 24, margin: 2 } }}>
      <DialogTitle sx={{ pt: 3, pb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: 800, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <Security color="primary" /> Manage User Role
        </Typography>
        <IconButton onClick={handleClose} sx={{ color: "text.secondary" }}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: { xs: 2, sm: 4 } }}>
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
      </DialogContent>
    </Dialog>
  );
};

export default AdminUpdateUser;
