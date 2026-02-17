import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, update } from "../../actions/userAction";
import { toast } from "react-toastify";
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Stack, 
  InputAdornment, 
  CircularProgress,
  useTheme,
  alpha 
} from "@mui/material";
import { Face, MailOutline, Save } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import MataData from "../layout/MataData";

const UpdateUser = ({ user }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isUpdated, loading } = useSelector((state) => state.update || {});
  
  const [firstName, setFirstName] = useState(user?.user?.firstName || "");
  const [lastName, setLastName] = useState(user?.user?.lastName || "");
  const [email, setEmail] = useState(user?.user?.email || "");

  const updateSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("firstName", firstName);
    myForm.set("lastName", lastName);
    myForm.set("email", email);
    dispatch(update(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      navigate("/account");
    }
  }, [dispatch, error, isUpdated, navigate]);

  return (
    <>
      <MataData title="Update Profile | Sopyshop" />
      <Box sx={{ bgcolor: "background.default", py: 8, minHeight: "100vh" }}>
        <Container maxWidth="xs">
          <Paper 
            elevation={0}
            sx={{ 
              p: 4, 
              borderRadius: 4, 
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              bgcolor: "background.paper"
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, textAlign: 'center' }}>
              Update Details
            </Typography>

            <Box component="form" onSubmit={updateSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Face color="primary" sx={{ mr: 1 }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Face color="primary" sx={{ mr: 1 }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutline color="primary" sx={{ mr: 1 }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  startIcon={<Save />}
                  sx={{ py: 1.5, fontWeight: 700 }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default UpdateUser;
