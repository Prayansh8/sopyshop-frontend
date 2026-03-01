import React, { Fragment, useEffect, useState } from "react";
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
  alpha,
  Container,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress
} from "@mui/material";
import { 
  Logout, 
  ShoppingBagOutlined, 
  DashboardOutlined, 
  EditOutlined, 
  CameraAltOutlined,
  VerifiedUserOutlined,
  ChevronRight,
  ArrowBackIosNew,
  FavoriteBorderOutlined,
  DeleteOutline
} from "@mui/icons-material";

import { AccountSkeleton } from "../../components/common/SkeletonLoader";

import { 
  clearErrors, 
  update, 
  UpdateAvatarAction, 
  loadUser, 
  addShippingInfoAction,
  updateShippingInfoAction,
  deleteShippingInfoAction
} from "../../redux/actions/userAction";
import { toast } from "react-toastify";
import { Country, State } from "country-state-city";

export default function Account() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { userInfo: user, isAuthenticated, loading: userLoading } = useSelector((state) => state.loadUser);
  const { error, isUpdated, loading: updateLoading } = useSelector((state) => state.update || {});

  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  // Address Modal State
  const [addressOpen, setAddressOpen] = useState(false);
  const [isEditAddressMode, setIsEditAddressMode] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState("");
  const [shippingName, setShippingName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingPinCode, setShippingPinCode] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");

  // Validation State
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFirstName(user.user.firstName || "");
      setLastName(user.user.lastName || "");
      setEmail(user.user.email || "");
      setPhone(user.user.phone || "");
      if (user.user.dob) {
        setDob(new Date(user.user.dob).toISOString().split('T')[0]);
      }
      setAvatarPreview(user.user.avatar || "");
    }
  }, [user]);

  useEffect(() => {
    if (userLoading === false && isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate, userLoading]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      setOpen(false);
      dispatch(loadUser());
      dispatch({ type: "UPDATE_USER_RESET" });
    }
  }, [dispatch, error, isUpdated]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    // Reset preview if cancelled
    if (user) setAvatarPreview(user.user.avatar);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const validateProfile = () => {
    let tempErrors = {};
    if (!firstName.trim()) tempErrors.firstName = "First name is required";
    if (!lastName.trim()) tempErrors.lastName = "Last name is required";
    if (!email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is invalid";
    }
    if (phone && !/^\d{10}$/.test(phone)) {
      tempErrors.phone = "Phone number must be 10 digits";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateProfile()) return;
    
    const userData = {
      firstName,
      lastName,
      email,
      phone,
      dob
    };

    await dispatch(update(userData));

    if (avatar) {
      const avatarForm = new FormData();
      avatarForm.append("avatar", avatar);
      await dispatch(UpdateAvatarAction(avatarForm));
    }
  };

  const handleAddressOpen = () => {
    setIsEditAddressMode(false);
    setAddressOpen(true);
    // Reset fields for new address
    setShippingName("");
    setShippingAddress("");
    setShippingCity("");
    setShippingState("");
    setShippingCountry("");
    setShippingPinCode("");
    setShippingPhone("");
  };

  const handleEditAddressOpen = (addr) => {
    setIsEditAddressMode(true);
    setEditingAddressId(addr._id);
    setShippingName(addr.name || "");
    setShippingAddress(addr.address || "");
    setShippingCity(addr.city || "");
    setShippingState(addr.state || "");
    setShippingCountry(addr.country || "");
    setShippingPinCode(addr.pinCode || "");
    setShippingPhone(addr.phone || "");
    setAddressOpen(true);
  };

  const handleAddressClose = () => {
    setAddressOpen(false);
    setIsEditAddressMode(false);
    setEditingAddressId("");
  };

  const validateAddress = () => {
    let tempErrors = {};
    if (!shippingName.trim()) tempErrors.name = "Receiver name is required";
    if (!shippingAddress.trim()) tempErrors.address = "Address is required";
    if (!shippingCountry) tempErrors.country = "Country is required";
    if (!shippingState) tempErrors.state = "State is required";
    if (!shippingCity.trim()) tempErrors.city = "City is required";
    if (!shippingPinCode.trim()) tempErrors.pinCode = "Pin code is required";
    if (!shippingPhone.trim()) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(shippingPhone)) {
      tempErrors.phone = "Phone number must be 10 digits";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!validateAddress()) return;

    const shippingData = {
      name: shippingName,
      address: shippingAddress,
      city: shippingCity,
      state: shippingState,
      country: shippingCountry,
      pinCode: shippingPinCode,
      phone: shippingPhone,
    };

    if (isEditAddressMode) {
      shippingData.addressId = editingAddressId;
      await dispatch(updateShippingInfoAction(shippingData));
      toast.success("Address Updated Successfully");
    } else {
      await dispatch(addShippingInfoAction(shippingData));
      toast.success("Address Added Successfully");
    }
    
    handleAddressClose();
    setShippingPhone("");
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await dispatch(deleteShippingInfoAction(addressId));
        toast.success("Address Deleted Successfully");
      } catch (err) {
        toast.error("Failed to delete address");
      }
    }
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
        <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pb: 10 }}>
          {/* High-End Page Header */}
          <Box 
            sx={{ 
              bgcolor: 'background.paper', 
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
              pt: { xs: 2, md: 4 },
              pb: { xs: 4, md: 4 },
              mb: { xs: 1, md: 2 },
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Container maxWidth="xl">
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
                <IconButton onClick={() => navigate("/")} sx={{ color: 'text.secondary' }}>
                  <ArrowBackIosNew fontSize="small" />
                </IconButton>
                <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: 'text.secondary' }}>
                  Back to Shop
                </Typography>
              </Stack>

              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} alignItems={{ xs: 'flex-start', sm: 'center' }}>
                    <Box sx={{ position: 'relative' }}>
                      <Avatar 
                        src={user.user.avatar} 
                        alt={user.user.firstName}
                        sx={{ 
                          width: { xs: 100, md: 160 }, 
                          height: { xs: 100, md: 160 }, 
                          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          boxShadow: theme.shadows[10]
                        }}
                      />
                      <IconButton 
                        onClick={handleOpen}
                        sx={{ 
                          position: 'absolute', 
                          bottom: 0, 
                          right: 0, 
                          bgcolor: 'primary.main', 
                          color: '#fff',
                          '&:hover': { bgcolor: 'primary.dark' },
                          width: 40,
                          height: 40,
                          border: `3px solid ${theme.palette.background.paper}`,
                          boxShadow: theme.shadows[5]
                        }}
                      >
                        <CameraAltOutlined fontSize="small" />
                      </IconButton>
                    </Box>
                    <Box>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                        <Typography variant="h2" sx={{ fontWeight: 950, letterSpacing: '-0.04em' }}>
                          {user.user.firstName} {user.user.lastName}
                        </Typography>
                        {user.user.role === "admin" && (
                          <Chip 
                            label="Admin" 
                            size="small" 
                            color="primary" 
                            sx={{ fontWeight: 900, borderRadius: 1, height: 20, fontSize: '0.65rem' }} 
                          />
                        )}
                      </Stack>
                      <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
                        {user.user.email}
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: alpha(theme.palette.text.secondary, 0.5), textTransform: 'uppercase', letterSpacing: 1 }}>
                        Member Since {formatDate(user.user.createdAt)}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={4} sx={{ textAlign: { md: 'right' } }}>
                  {/* Edit Profile button removed as requested */}
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* Profile Update Modal */}
          <Dialog 
            open={open} 
            onClose={handleClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
              sx: { borderRadius: 3, p: 2 }
            }}
          >
            <DialogTitle sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 950, letterSpacing: '-0.04em' }}>
                Update Profile
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                Refine your boutique presence
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Box component="form" sx={{ mt: 2 }}>
                <Stack spacing={4} alignItems="center">
                  <Box sx={{ position: 'relative', mb: 2 }}>
                    <Avatar 
                      src={avatarPreview} 
                      sx={{ 
                        width: 120, 
                        height: 120, 
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        boxShadow: theme.shadows[4]
                      }} 
                    />
                    <IconButton
                      component="label"
                      sx={{ 
                        position: 'absolute', 
                        bottom: -10, 
                        right: -10, 
                        bgcolor: 'background.paper', 
                        color: 'primary.main',
                        '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.05) },
                        width: 40,
                        height: 40,
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        boxShadow: theme.shadows[2]
                      }}
                    >
                      <CameraAltOutlined fontSize="small" />
                      <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
                    </IconButton>
                  </Box>

                  <TextField
                    fullWidth
                    label="First Name"
                    variant="standard"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (errors.firstName) setErrors({ ...errors, firstName: null });
                    }}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    InputProps={{ sx: { fontWeight: 700 } }}
                    InputLabelProps={{ shrink: true, sx: { fontWeight: 800, textTransform: 'uppercase', fontSize: '0.7rem' } }}
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="standard"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if (errors.lastName) setErrors({ ...errors, lastName: null });
                    }}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    InputProps={{ sx: { fontWeight: 700 } }}
                    InputLabelProps={{ shrink: true, sx: { fontWeight: 800, textTransform: 'uppercase', fontSize: '0.7rem' } }}
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    variant="standard"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: null });
                    }}
                    error={!!errors.email}
                    helperText={errors.email}
                    InputProps={{ sx: { fontWeight: 700 } }}
                    InputLabelProps={{ shrink: true, sx: { fontWeight: 800, textTransform: 'uppercase', fontSize: '0.7rem' } }}
                  />
                  <TextField
                    fullWidth
                    label="Phone Number"
                    variant="standard"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: null });
                    }}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    InputProps={{ sx: { fontWeight: 700 } }}
                    InputLabelProps={{ shrink: true, sx: { fontWeight: 800, textTransform: 'uppercase', fontSize: '0.7rem' } }}
                  />
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    type="date"
                    variant="standard"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    InputProps={{ sx: { fontWeight: 700 } }}
                    InputLabelProps={{ shrink: true, sx: { fontWeight: 800, textTransform: 'uppercase', fontSize: '0.7rem' } }}
                  />
                </Stack>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3, justifyContent: 'center' }}>
              <Button 
                onClick={handleClose} 
                sx={{ fontWeight: 800, color: 'text.secondary' }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleUpdate}
                variant="contained"
                disabled={updateLoading}
                sx={{ 
                  borderRadius: 1, 
                  px: 4, 
                  py: 1, 
                  fontWeight: 900,
                  minWidth: 140
                }}
              >
                {updateLoading ? <CircularProgress size={20} color="inherit" /> : "Save Changes"}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Add Address Modal */}
          <Dialog 
            open={addressOpen} 
            onClose={handleAddressClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
              sx: { borderRadius: 3, p: 2 }
            }}
          >
            <DialogTitle sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 950, letterSpacing: '-0.04em' }}>
                {isEditAddressMode ? "Edit Address" : "Add New Address"}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Box component="form" sx={{ mt: 2 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name (Receiver)"
                      variant="standard"
                      value={shippingName}
                      onChange={(e) => {
                        setShippingName(e.target.value);
                        if (errors.name) setErrors({ ...errors, name: null });
                      }}
                      error={!!errors.name}
                      helperText={errors.name}
                      InputLabelProps={{ shrink: true, sx: { fontWeight: 800, fontSize: '0.7rem' } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Complete Address"
                      variant="standard"
                      value={shippingAddress}
                      onChange={(e) => {
                        setShippingAddress(e.target.value);
                        if (errors.address) setErrors({ ...errors, address: null });
                      }}
                      error={!!errors.address}
                      helperText={errors.address}
                      InputLabelProps={{ shrink: true, sx: { fontWeight: 800, fontSize: '0.7rem' } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      label="Country"
                      variant="standard"
                      value={shippingCountry}
                      onChange={(e) => {
                        setShippingCountry(e.target.value);
                        if (errors.country) setErrors({ ...errors, country: null });
                      }}
                      error={!!errors.country}
                      helperText={errors.country}
                      SelectProps={{ native: true }}
                      InputLabelProps={{ shrink: true, sx: { fontWeight: 800, fontSize: '0.7rem' } }}
                    >
                      <option value="">Select Country</option>
                      {Country.getAllCountries().map((i) => (
                        <option key={i.isoCode} value={i.isoCode}>{i.name}</option>
                      ))}
                    </TextField>
                  </Grid>
                  {shippingCountry && (
                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        fullWidth
                        label="State"
                        variant="standard"
                        value={shippingState}
                        onChange={(e) => {
                          setShippingState(e.target.value);
                          if (errors.state) setErrors({ ...errors, state: null });
                        }}
                        error={!!errors.state}
                        helperText={errors.state}
                        SelectProps={{ native: true }}
                        InputLabelProps={{ shrink: true, sx: { fontWeight: 800, fontSize: '0.7rem' } }}
                      >
                        <option value="">Select State</option>
                        {State.getStatesOfCountry(shippingCountry).map((i) => (
                          <option key={i.isoCode} value={i.name}>{i.name}</option>
                        ))}
                      </TextField>
                    </Grid>
                  )}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="City"
                      variant="standard"
                      value={shippingCity}
                      onChange={(e) => {
                        setShippingCity(e.target.value);
                        if (errors.city) setErrors({ ...errors, city: null });
                      }}
                      error={!!errors.city}
                      helperText={errors.city}
                      InputLabelProps={{ shrink: true, sx: { fontWeight: 800, fontSize: '0.7rem' } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Pin Code"
                      variant="standard"
                      value={shippingPinCode}
                      onChange={(e) => {
                        setShippingPinCode(e.target.value);
                        if (errors.pinCode) setErrors({ ...errors, pinCode: null });
                      }}
                      error={!!errors.pinCode}
                      helperText={errors.pinCode}
                      InputLabelProps={{ shrink: true, sx: { fontWeight: 800, fontSize: '0.7rem' } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      variant="standard"
                      value={shippingPhone}
                      onChange={(e) => {
                        setShippingPhone(e.target.value);
                        if (errors.phone) setErrors({ ...errors, phone: null });
                      }}
                      error={!!errors.phone}
                      helperText={errors.phone}
                      InputLabelProps={{ shrink: true, sx: { fontWeight: 800, fontSize: '0.7rem' } }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3, justifyContent: 'center' }}>
              <Button onClick={handleAddressClose} sx={{ fontWeight: 800 }}>Cancel</Button>
              <Button 
                onClick={handleAddAddress}
                variant="contained"
                sx={{ borderRadius: 1, px: 4, fontWeight: 900 }}
              >
                Save Address
              </Button>
            </DialogActions>
          </Dialog>

          <Box maxWidth="xl">
            <Grid container spacing={2} alignItems="flex-start">
              {/* Sidebar Menu */}
              <Grid item size={{xs:3, md:3, lg:3}}>
                <Stack spacing={2} sx={{ position: { md: 'sticky' }, top: { md: 24 } }}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: { xs: 3, md: 4 }, 
                      borderRadius: 2, 
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      bgcolor: 'background.paper',
                      height: 'fit-content'
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 3, 
                        fontWeight: 900, 
                        letterSpacing: 1, 
                        textTransform: 'uppercase', 
                        color: 'text.primary',
                        fontSize: '0.9rem' 
                      }}
                    >
                      Account Menu
                    </Typography>
                    <Stack>
                      <Button 
                        fullWidth 
                        startIcon={<ShoppingBagOutlined />} 
                        endIcon={<ChevronRight />}
                        component={Link} 
                        to="/orders"
                        sx={{ 
                          justifyContent: 'space-between', 
                          py: 1.5, 
                          px: 0, 
                          fontWeight: 700, 
                          color: 'text.primary',
                          minWidth: 0,
                          '&:hover': { bgcolor: 'transparent', color: 'primary.main' }
                        }}
                      >
                        My Orders
                      </Button>
                      <Divider />
                      <Button 
                        fullWidth 
                        startIcon={<FavoriteBorderOutlined />} 
                        endIcon={<ChevronRight />}
                        component={Link} 
                        to="/wishlist"
                        sx={{ 
                          justifyContent: 'space-between', 
                          py: 1.5, 
                          px: 0, 
                          fontWeight: 700, 
                          color: 'text.primary',
                          minWidth: 0,
                          '&:hover': { bgcolor: 'transparent', color: 'primary.main' }
                        }}
                      >
                        My Wishlist
                      </Button>
                      <Divider />
                      {user.user.role === "admin" && (
                        <>
                          <Button 
                            fullWidth 
                            startIcon={<DashboardOutlined />} 
                            endIcon={<ChevronRight />}
                            component={Link} 
                            to="/admin/dashboard"
                            sx={{ 
                              justifyContent: 'space-between', 
                              py: 1.5, 
                              px: 0, 
                              fontWeight: 700, 
                              color: 'text.primary',
                              minWidth: 0,
                              '&:hover': { bgcolor: 'transparent', color: 'primary.main' }
                            }}
                          >
                            Admin Dashboard
                          </Button>
                          <Divider />
                        </>
                      )}
                      <Button 
                        fullWidth 
                        startIcon={<Logout />} 
                        onClick={handleLogout}
                        sx={{ 
                          justifyContent: 'flex-start', 
                          py: 1.5, 
                          px: 0, 
                          fontWeight: 700, 
                          color: 'error.main',
                          '&:hover': { bgcolor: 'transparent', color: 'error.dark' }
                        }}
                      >
                        Logout Session
                      </Button>
                    </Stack>
                  </Paper>

                  <Box sx={{ p: 3, borderRadius: 2, border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`, bgcolor: alpha(theme.palette.success.main, 0.02) }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <VerifiedUserOutlined color="success" />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 800 }}>Verified Account</Typography>
                        <Typography variant="caption" color="text.secondary">Your account is fully secured</Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
              </Grid>

              {/* Main Content Info */}
              <Grid item size={{xs:9, md:9, lg:9}}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    borderRadius: 2, 
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    bgcolor: 'background.paper',
                    height: 'fit-content'
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 950, mb: 5, letterSpacing: '-0.02em' }}>
                    Personal Information
                  </Typography>

                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={0.5}>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                          Full Name
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700 }}>
                          {user.user.firstName} {user.user.lastName}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={0.5}>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                          Email Address
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>
                            {user.user.email}
                          </Typography>
                          <VerifiedUserOutlined sx={{ fontSize: 16, color: 'success.main' }} />
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={0.5}>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                          Phone Number
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700 }}>
                          {user.user.phone || 'Not provided'}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={0.5}>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                          Date of Birth
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700 }}>
                          {formatDate(user.user.dob)}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 6, borderStyle: 'dashed' }} />

                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 900 }}>
                      Address Information
                    </Typography>
                    <Button 
                      variant="outlined" 
                      size="small" 
                      onClick={handleAddressOpen}
                      sx={{ borderRadius: 1, fontWeight: 800, borderWeight: 2 }}
                    >
                      Add New Address
                    </Button>
                  </Stack>
                  
                  {user.user.shippingInfo && user.user.shippingInfo.length > 0 ? (
                    <Grid container spacing={1}>
                      {user.user.shippingInfo.map((addr, index) => (
                        <Grid item size={{xs:12, md:6, lg:6}} key={index}>
                          <Box sx={{ 
                            p: 2, 
                            borderRadius: 1, 
                            border: `1px solid ${theme.palette.divider}`, 
                            bgcolor: alpha(theme.palette.divider, 0.02),
                            position: 'relative',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              bgcolor: alpha(theme.palette.divider, 0.05),
                              borderColor: theme.palette.primary.main,
                              '& .address-actions': { opacity: 1 }
                            }
                          }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 800, mb: 0.5 }}>{addr.name}</Typography>
                                <Typography variant="caption" color="text.secondary" display="block">
                                  {addr.address}, {addr.city}, {addr.state}, {addr.country} - {addr.pinCode}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                                  Phone: {addr.phone}
                                </Typography>
                              </Box>
                              <Stack 
                                className="address-actions" 
                                direction="row" 
                                spacing={1} 
                                sx={{ 
                                  opacity: { xs: 1, md: 0 }, 
                                  transition: 'opacity 0.2s ease' 
                                }}
                              >
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleEditAddressOpen(addr)}
                                  sx={{ color: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.1) }}
                                >
                                  <EditOutlined fontSize="small" />
                                </IconButton>
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleDeleteAddress(addr._id)}
                                  sx={{ color: 'error.main', bgcolor: alpha(theme.palette.error.main, 0.1) }}
                                >
                                  <DeleteOutline fontSize="small" />
                                </IconButton>
                              </Stack>
                            </Stack>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                      No shipping addresses saved yet.
                    </Typography>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Fragment>
  );
}
