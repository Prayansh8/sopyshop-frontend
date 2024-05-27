import React, { useState } from 'react';
import { TextField, Button, Grid, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { AccountCircle, EmailOutlined, LockOutlined, Phone, Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';
import './SignupForm.css'; // Import the CSS file
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../actions/userAction';

const SignupForm = () => {
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.user);
  const { loading, userInfo } = userRegister;
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
    if (name === 'phone') {
      if (/^\d*$/.test(value) && value.length <= 10) {
        setRegistrationData({ ...registrationData, [name]: value });
      }
    } else {
      setRegistrationData({ ...registrationData, [name]: value });
    }
  };

  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 4) {
      errors.push('Password must be at least 4 characters');
    }
    if (password.length > 32) {
      errors.push('Password must be at most 32 characters');
    }
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one digit');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return errors;
  };

  const validateForm = () => {
    const errors = {};

    if (!registrationData.firstName) {
      errors.firstName = 'First name is required';
    }
    if (!registrationData.lastName) {
      errors.lastName = 'Last name is required';
    }
    if (!registrationData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(registrationData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!registrationData.phone) {
      errors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(registrationData.phone)) {
      errors.phone = 'Phone number must be 10 digits';
    }
    if (!registrationData.dob) {
      errors.dob = 'Date of birth is required';
    }
    const passwordErrors = validatePassword(registrationData.password);
    if (passwordErrors.length > 0) {
      errors.password = passwordErrors.join(', ');
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(registerUser(registrationData));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (userInfo) {
    toast.success('Registration Successful!');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="First Name"
          fullWidth
          name="firstName"
          value={registrationData.firstName}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          InputProps={{
            startAdornment: <AccountCircle />,
          }}
          error={!!errors.firstName}
          helperText={errors.firstName}
          className='text-field'
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
          margin="normal"
          InputProps={{
            startAdornment: <AccountCircle />,
          }}
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Email"
          fullWidth
          name="email"
          value={registrationData.email}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          InputProps={{
            startAdornment: <EmailOutlined />,
          }}
          error={!!errors.email}
          helperText={errors.email}
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
          margin="normal"
          InputProps={{
            startAdornment: <Phone />,
          }}
          inputProps={{
            maxLength: 10,
          }}
          error={!!errors.phone}
          helperText={errors.phone}
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
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          error={!!errors.dob}
          helperText={errors.dob}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Password"
          fullWidth
          name="password"
          value={registrationData.password}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            startAdornment: <LockOutlined />,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          inputProps={{
            minLength: 4,
            maxLength: 32,
          }}
          error={!!errors.password}
          helperText={errors.password}
          className='text-field'
        />
      </Grid>
      <Grid item xs={12}>
        {loading && <CircularProgress />}
        <Button className="submitBtn" variant="contained" color="primary" fullWidth onClick={handleSubmit}>Sign Up</Button>
      </Grid>
    </Grid>
  );
};

export default SignupForm;
