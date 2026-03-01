import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, update } from "../../redux/actions/userAction";
import { toast } from "react-toastify";
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Stack, 
  InputAdornment, 
  CircularProgress,
  useTheme,
  alpha,
  Container,
  IconButton
} from "@mui/material";
import { 
  PersonOutline, 
  MailOutline, 
  ArrowBackIosNew
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Metadata from "../../components/layout/Metadata";

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
    const userData = {
      firstName,
      lastName,
      email
    };
    dispatch(update(userData));
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
      <Metadata title="Update Profile | Sopyshop" />
      <Box sx={{ bgcolor: "background.default", py: 10, minHeight: "100vh" }}>
        <Container maxWidth="xs">
          <Paper 
            elevation={0}
            sx={{ 
              p: 5, 
              borderRadius: 2, 
              border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
              bgcolor: "background.paper",
              boxShadow: theme.shadows[1]
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 4 }}>
              <IconButton onClick={() => navigate("/account")} sx={{ color: 'text.secondary', p: 0.5 }}>
                <ArrowBackIosNew sx={{ fontSize: 16 }} />
              </IconButton>
              <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', color: 'text.secondary' }}>
                Account Settings
              </Typography>
            </Stack>

            <Typography variant="h3" sx={{ fontWeight: 950, mb: 1, letterSpacing: '-0.04em' }}>
              Edit Profile
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 5, fontWeight: 500 }}>
              Update your personal details below.
            </Typography>

            <Box component="form" onSubmit={updateSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="First Name"
                  variant="standard"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  InputProps={{
                    sx: { fontWeight: 700, py: 1 },
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutline sx={{ color: alpha(theme.palette.text.primary, 0.4), mr: 1 }} />
                      </InputAdornment>
                    ) }}
                  InputLabelProps={{ shrink: true, sx: { fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, fontSize: '0.7rem' } }}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  variant="standard"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  InputProps={{
                    sx: { fontWeight: 700, py: 1 },
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutline sx={{ color: alpha(theme.palette.text.primary, 0.4), mr: 1 }} />
                      </InputAdornment>
                    ) }}
                  InputLabelProps={{ shrink: true, sx: { fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, fontSize: '0.7rem' } }}
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  variant="standard"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    sx: { fontWeight: 700, py: 1 },
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutline sx={{ color: alpha(theme.palette.text.primary, 0.4), mr: 1 }} />
                      </InputAdornment>
                    ) }}
                  InputLabelProps={{ shrink: true, sx: { fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, fontSize: '0.7rem' } }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{ 
                    mt: 3,
                    py: 2, 
                    fontWeight: 900, 
                    borderRadius: 1,
                    letterSpacing: 1,
                    boxShadow: 'none',
                    '&:hover': { boxShadow: theme.shadows[4] }
                  }}
                >
                  {loading ? <CircularProgress size={20} color="inherit" /> : "SAVE CHANGES"}
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
