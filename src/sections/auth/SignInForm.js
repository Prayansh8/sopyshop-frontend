import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { AccountCircle, LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';
import './SignInForm.css'; // Import the CSS file
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../actions/userAction';

const SignInForm = () => {

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user);
  const { loading, error, userInfo } = userLogin;
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    identifier: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginData));
  };

  if (userInfo) {
    toast.success('Login Successful!');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          required
          label="Email, Username, or Phone"
          fullWidth
          name="identifier"
          value={loginData.identifier}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          InputProps={{
            startAdornment: <AccountCircle />,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          label="Password"
          fullWidth
          name="password"
          value={loginData.password}
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
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          href="/forgot-password" // Link to the forgot password page
          className="forgot-password-button"
        >
          Forgot Password?
        </Button>
      </Grid>
      <Grid item xs={12}>
        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>Sign In</Button>
      </Grid>
    </Grid>
  );
};

export default SignInForm;
