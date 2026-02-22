import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../redux/actions/cartAction";
import { addShippingInfoAction } from "../../redux/actions/userAction";
import Metadata from "../../components/layout/Metadata";
import { Country, State } from "country-state-city";
import {
  Home as HomeIcon,
  LocationCity as CityIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Place as PinIcon,
  Public as PublicIcon,
  TransferWithinAStation as StateIcon,
  History as HistoryIcon,
  CheckCircle as SelectedIcon
} from "@mui/icons-material";
import CheckOutStep from "../../components/cart/CheckOutStep";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
  useTheme,
  alpha,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Divider
} from "@mui/material";

const Shipping = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  
  const { shippingInfo } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.loadUser);
  const savedAddresses = userInfo?.user?.shippingInfo || [];

  const [name, setName] = useState(shippingInfo?.name || "");
  const [address, setAddress] = useState(shippingInfo?.address || "");
  const [city, setCity] = useState(shippingInfo?.city || "");
  const [state, setState] = useState(shippingInfo?.state || "");
  const [country, setCountry] = useState(shippingInfo?.country || "");
  const [pinCode, setPinCode] = useState(shippingInfo?.pinCode || "");
  const [phone, setPhone] = useState(shippingInfo?.phone || "");

  const handleSelectSavedAddress = (addr) => {
    setName(addr.name || "");
    setAddress(addr.address || "");
    setCity(addr.city || "");
    setState(addr.state || "");
    setCountry(addr.country || "");
    setPinCode(addr.pinCode || "");
    setPhone(addr.phone || "");
    toast.info("Address selected!");
  };

  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      toast.error("Phone Number should be 10 digit");
      return;
    }

    const shippingData = {
      name,
      address,
      city,
      state,
      country,
      pinCode,
      phone
    };

    // Save to local cart state
    dispatch(saveShippingInfo(shippingData));

    // Save to user profile on backend
    dispatch(addShippingInfoAction(shippingData));

    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <Metadata title={"Sopyshop | Shipping Details"} />
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <CheckOutStep activeStep={0} />
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {/* Saved Addresses Section */}
          {savedAddresses.length > 0 && (
            <Grid item xs={12} lg={4}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 4, 
                  borderRadius: 4, 
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}`,
                  height: '100%'
                }}
              >
                <Stack spacing={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <HistoryIcon color="primary" />
                    <Typography variant="h5" sx={{ fontWeight: 900 }}>
                      Saved Addresses
                    </Typography>
                  </Box>
                  
                  <Divider />

                  <Stack spacing={2} sx={{ maxHeight: 600, overflowY: 'auto', pr: 1 }}>
                    {savedAddresses.map((addr, index) => {
                      const isSelected = addr.address === address && addr.pinCode === pinCode;
                      return (
                        <Card 
                          key={index}
                          variant="outlined"
                          sx={{ 
                            borderRadius: 3,
                            borderColor: isSelected ? 'primary.main' : 'divider',
                            bgcolor: isSelected ? alpha(theme.palette.primary.main, 0.02) : 'transparent',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              borderColor: 'primary.main',
                              boxShadow: theme.shadows[2]
                            }
                          }}
                        >
                          <CardActionArea onClick={() => handleSelectSavedAddress(addr)}>
                            <CardContent sx={{ p: 2.5 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                                  {addr.name}
                                </Typography>
                                {isSelected && <SelectedIcon color="primary" fontSize="small" />}
                              </Box>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, lineHeight: 1.6 }}>
                                {addr.address}, {addr.city}, {addr.state}, {addr.pinCode}, {addr.country}
                              </Typography>
                              <Typography variant="caption" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <PhoneIcon sx={{ fontSize: 14 }} /> {addr.phone}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      );
                    })}
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          )}

          {/* Shipping Form Section */}
          <Grid item xs={12} lg={savedAddresses.length > 0 ? 8 : 12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 3, md: 6 }, 
                borderRadius: 4, 
                width: '100%',
                maxWidth: 700,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.05)}`,
                bgcolor: 'background.paper'
              }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 900, 
                  mb: 4, 
                  textAlign: 'center',
                  color: 'text.primary',
                  letterSpacing: '-0.02em'
                }}
              >
                Shipping Details
              </Typography>

              <form onSubmit={shippingSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      variant="outlined"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      variant="outlined"
                      required
                      multiline
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <HomeIcon color="primary" sx={{ mt: -2 }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="City"
                      variant="outlined"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CityIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Pin Code"
                      variant="outlined"
                      required
                      type="number"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PinIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      variant="outlined"
                      required
                      type="number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      label="Country"
                      variant="outlined"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PublicIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    >
                      <MenuItem value="">Select Country</MenuItem>
                      {Country.getAllCountries().map((item) => (
                        <MenuItem key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  {country && (
                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        fullWidth
                        label="State"
                        variant="outlined"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <StateIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                      >
                        <MenuItem value="">Select State</MenuItem>
                        {State.getStatesOfCountry(country).map((item) => (
                          <MenuItem key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  )}

                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={!state}
                      sx={{ 
                        py: 2, 
                        borderRadius: 3, 
                        fontSize: '1.1rem', 
                        fontWeight: 900,
                        boxShadow: theme.shadows[8]
                      }}
                    >
                      Continue to Confirm
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Shipping;
