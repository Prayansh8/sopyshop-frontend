import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Grid, 
  IconButton, 
  InputAdornment, 
  CircularProgress,
  Box,
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
  CalendarMonth,
  PersonAddAlt1
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/actions/userAction';

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
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!registrationData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!registrationData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!registrationData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(registrationData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!registrationData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(registrationData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!registrationData.dob) newErrors.dob = 'Date of birth is required';
    if (!registrationData.password) {
      newErrors.password = 'Password is required';
    } else if (registrationData.password.length < 6) {
      newErrors.password = 'Min 6 characters required';
    }
    
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
      dispatch(registerUser(myForm));
    }
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 3,
      transition: 'all 0.3s ease',
      backgroundColor: alpha(theme.palette.background.default, 0.5),
      '&:hover': {
        backgroundColor: alpha(theme.palette.background.default, 0.8),
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.main,
          borderWidth: '2px',
        },
      },
      '&.Mui-focused': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`,
      }
    },
    '& .MuiInputLabel-root': {
      fontWeight: 600,
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item size={{xs: 6, sm: 6, lg: 6}}>
          <TextField
            label="First Name"
            fullWidth
            name="firstName"
            value={registrationData.firstName}
            onChange={handleChange}
            variant="outlined"
            sx={inputStyles}
            error={!!errors.firstName}
            helperText={errors.firstName}
            InputProps={{
              startAdornment: <InputAdornment position="start"><AccountCircle sx={{ color: theme.palette.primary.main, mr: 0.5 }}/></InputAdornment>,
            }}
          />
        </Grid>
        <Grid item size={{xs: 6, sm: 6, lg: 6}}>
          <TextField
            label="Last Name"
            fullWidth
            name="lastName"
            value={registrationData.lastName}
            onChange={handleChange}
            variant="outlined"
            sx={inputStyles}
            error={!!errors.lastName}
            helperText={errors.lastName}
            InputProps={{
              startAdornment: <InputAdornment position="start"><AccountCircle sx={{ color: theme.palette.primary.main, mr: 0.5 }}/></InputAdornment>,
            }}
          />
        </Grid>
        <Grid item size={{xs: 12, sm: 12, lg: 12}}>
          <TextField
            label="Email Address"
            fullWidth
            name="email"
            type="email"
            value={registrationData.email}
            onChange={handleChange}
            variant="outlined"
            sx={inputStyles}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: <InputAdornment position="start"><EmailOutlined sx={{ color: theme.palette.primary.main, mr: 0.5 }}/></InputAdornment>,
            }}
          />
        </Grid>
        <Grid item size={{xs: 12, sm: 12, lg: 6}}>
          <TextField
            label="Phone Number"
            fullWidth
            name="phone"
            value={registrationData.phone}
            onChange={handleChange}
            variant="outlined"
            sx={inputStyles}
            error={!!errors.phone}
            helperText={errors.phone}
            InputProps={{
              startAdornment: <InputAdornment position="start"><Phone sx={{ color: theme.palette.primary.main, mr: 0.5 }}/></InputAdornment>,
            }}
          />
        </Grid>
        <Grid item size={{xs: 12, sm: 12, lg: 6}}>
          <TextField
            label="Date of Birth"
            fullWidth
            name="dob"
            type="date"
            value={registrationData.dob}
            onChange={handleChange}
            variant="outlined"
            sx={inputStyles}
            error={!!errors.dob}
            helperText={errors.dob}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><CalendarMonth sx={{ color: theme.palette.primary.main, mr: 0.5 }}/></InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Create Password"
            fullWidth
            name="password"
            value={registrationData.password}
            onChange={handleChange}
            variant="outlined"
            sx={inputStyles}
            type={showPassword ? 'text' : 'password'}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              startAdornment: <InputAdornment position="start"><LockOutlined sx={{ color: theme.palette.primary.main, mr: 0.5 }}/></InputAdornment>,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: 'text.secondary' }}>
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', px: 1 }}>
            Password must be at least 6 characters long.
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: 1 }}>
          <Button 
            type="submit"
            variant="contained" 
            color="primary" 
            fullWidth 
            disabled={loading}
            startIcon={!loading && <PersonAddAlt1 />}
            sx={{ 
              py: 1.8, 
              fontSize: '1rem', 
              fontWeight: 800, 
              borderRadius: 3,
              textTransform: 'none',
              boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 12px 30px ${alpha(theme.palette.primary.main, 0.4)}`,
              },
              '&:active': {
                transform: 'translateY(0)',
              }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Create Your Secure Account"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignupForm;
