import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Grid, 
  IconButton, 
  InputAdornment, 
  CircularProgress,
  Box,
  Stack,
  useTheme,
  alpha,
  Typography
} from '@mui/material';
import { 
  AccountCircle, 
  EmailOutlined, 
  LockOutlined, 
  Phone, 
  Visibility, 
  VisibilityOff,
  CalendarMonth
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../actions/userAction';

const SignupForm = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loadUser);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({ ...registrationData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!registrationData.firstName) newErrors.firstName = 'First name required';
    if (!registrationData.lastName) newErrors.lastName = 'Last name required';
    if (!registrationData.email) newErrors.email = 'Email required';
    if (!registrationData.phone) newErrors.phone = 'Phone required';
    if (!registrationData.dob) newErrors.dob = 'Date of birth required';
    if (registrationData.password.length < 6) newErrors.password = 'Min 6 characters required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const myForm = new FormData();
      myForm.set("firstName", registrationData.firstName);
      myForm.set("lastName", registrationData.lastName);
      myForm.set("email", registrationData.email);
      myForm.set("phone", registrationData.phone);
      myForm.set("dob", registrationData.dob);
      myForm.set("password", registrationData.password);
      // Avatar handled separately or defaults
      dispatch(registerUser(myForm));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            fullWidth
            name="firstName"
            value={registrationData.firstName}
            onChange={handleChange}
            variant="outlined"
            error={!!errors.firstName}
            helperText={errors.firstName}
            InputProps={{
              startAdornment: <InputAdornment position="start"><AccountCircle sx={{ color: 'text.secondary', mr: 1 }}/></InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            fullWidth
            name="lastName"
            value={registrationData.lastName}
            onChange={handleChange}
            variant="outlined"
            error={!!errors.lastName}
            helperText={errors.lastName}
            InputProps={{
              startAdornment: <InputAdornment position="start"><AccountCircle sx={{ color: 'text.secondary', mr: 1 }}/></InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            fullWidth
            name="email"
            type="email"
            value={registrationData.email}
            onChange={handleChange}
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: <InputAdornment position="start"><EmailOutlined sx={{ color: 'text.secondary', mr: 1 }}/></InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone"
            fullWidth
            name="phone"
            value={registrationData.phone}
            onChange={handleChange}
            variant="outlined"
            error={!!errors.phone}
            helperText={errors.phone}
            InputProps={{
              startAdornment: <InputAdornment position="start"><Phone sx={{ color: 'text.secondary', mr: 1 }}/></InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Date of Birth"
            fullWidth
            name="dob"
            type="date"
            value={registrationData.dob}
            onChange={handleChange}
            variant="outlined"
            error={!!errors.dob}
            helperText={errors.dob}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><CalendarMonth sx={{ color: 'text.secondary', mr: 1 }}/></InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            fullWidth
            name="password"
            value={registrationData.password}
            onChange={handleChange}
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              startAdornment: <InputAdornment position="start"><LockOutlined sx={{ color: 'text.secondary', mr: 1 }}/></InputAdornment>,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Button 
            type="submit"
            variant="contained" 
            color="primary" 
            fullWidth 
            disabled={loading}
            sx={{ py: 1.5, fontSize: '1rem', fontWeight: 700 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignupForm;
