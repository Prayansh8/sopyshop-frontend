import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/userAction";
import Metadata from "../../components/layout/Metadata";
import { 
  Box, 
   
  Typography, 
  Grid, 
  Paper, 
  Avatar, 
  Button, 
  Stack, 
  Divider, 
  useTheme, 
  alpha 
} from "@mui/material";
import { 
  Logout, 
  ShoppingBag, 
  Dashboard as DashboardIcon, 
  Edit, 
  Badge,
  Email,
  Phone,
  CalendarMonth,
  AdminPanelSettings
} from "@mui/icons-material";
import { settingsConfig } from "../../settingsConfig";

import { AccountSkeleton } from "../../components/common/SkeletonLoader";

export default function Account() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { userInfo: user, isAuthenticated } = useSelector((state) => state.loadUser);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Fragment>
      <Metadata title={`${user?.user?.firstName || 'User'}'s Profile | Sopyshop`} />
      {!user ? (
        <AccountSkeleton />
      ) : (
        <Box sx={{ bgcolor: "background.default", py: 8, minHeight: "100vh" }}>
          <Box maxWidth="md">
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 6, textAlign: 'center' }}>
              My Profile
            </Typography>

            <Grid container spacing={4}>
              {/* Profile Card */}
              <Grid item xs={12} md={4}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    textAlign: 'center', 
                    borderRadius: 4, 
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    boxShadow: theme.palette.mode === 'light' 
                      ? settingsConfig.styles.boxShadowLight 
                      : settingsConfig.styles.boxShadowDark }}
                >
                  <Avatar 
                    src={user.user.avatar} 
                    alt={user.user.firstName}
                    sx={{ 
                      width: 140, 
                      height: 140, 
                      mx: 'auto', 
                      mb: 3,
                      border: `4px solid ${alpha(theme.palette.primary.main, 0.2)}`
                    }}
                  />
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                    {user.user.firstName} {user.user.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                    Joined on {formatDate(user.user.createdAt)}
                  </Typography>

                  <Stack spacing={2}>
                    <Button 
                      fullWidth 
                      variant="contained" 
                      startIcon={<Edit />} 
                      component={Link} 
                      to="/update"
                      sx={{ fontWeight: 700 }}
                    >
                      Edit Bio
                    </Button>
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      startIcon={<Badge />} 
                      component={Link} 
                      to="/update/avatar"
                      sx={{ fontWeight: 700 }}
                    >
                      Change Avatar
                    </Button>
                  </Stack>
                </Paper>
              </Grid>

              {/* Account Details */}
              <Grid item xs={12} md={8}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    borderRadius: 4, 
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>
                    Personal Information
                  </Typography>

                  <Stack spacing={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Email color="primary" />
                      <Box>
                        <Typography variant="caption" color="text.secondary">Email Address</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{user.user.email}</Typography>
                      </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Phone color="primary" />
                      <Box>
                        <Typography variant="caption" color="text.secondary">Phone Number</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{user.user.phone || 'Not provided'}</Typography>
                      </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CalendarMonth color="primary" />
                      <Box>
                        <Typography variant="caption" color="text.secondary">Date of Birth</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{formatDate(user.user.dob)}</Typography>
                      </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <AdminPanelSettings color="primary" />
                      <Box>
                        <Typography variant="caption" color="text.secondary">Account Role</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>{user.user.role}</Typography>
                      </Box>
                    </Box>
                  </Stack>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 6 }}>
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      startIcon={<ShoppingBag />} 
                      component={Link} 
                      to="/orders"
                      sx={{ fontWeight: 700, px: 4 }}
                    >
                      My Orders
                    </Button>
                    {user.user.role === "admin" && (
                      <Button 
                        variant="contained" 
                        color="primary" 
                        startIcon={<DashboardIcon />} 
                        component={Link} 
                        to="/admin/dashboard"
                        sx={{ fontWeight: 700, px: 4 }}
                      >
                        Admin Dashboard
                      </Button>
                    )}
                    <Button 
                      variant="text" 
                      color="error" 
                      startIcon={<Logout />} 
                      onClick={handleLogout}
                      sx={{ fontWeight: 700, ml: { sm: 'auto !important' } }}
                    >
                      Logout
                    </Button>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Fragment>
  );
}
