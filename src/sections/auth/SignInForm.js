import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Grid, 
  Typography, 
  IconButton, 
  InputAdornment, 
  CircularProgress,
  Stack,
  useTheme,
  alpha,
  Box
} from '@mui/material';
import { 
  EmailOutlined, 
  LockOutlined, 
  Visibility, 
  VisibilityOff 
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../actions/userAction';
import { Link } from 'react-router-dom';

const SignInForm = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.loadUser);
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginData.email, loginData.password));
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          required
          label="Email Address"
          fullWidth
          name="email"
          type="email"
          value={loginData.email}
          onChange={handleChange}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlined sx={{ color: 'text.secondary', mr: 1 }} />
              </InputAdornment>
            ),
          }}
        />
        
        <Box>
          <TextField
            required
            label="Password"
            fullWidth
            name="password"
            value={loginData.password}
            onChange={handleChange}
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined sx={{ color: 'text.secondary', mr: 1 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Typography 
              variant="body2" 
              component={Link} 
              to="/password/forgot" 
              sx={{ 
                color: 'primary.main', 
                textDecoration: 'none', 
                fontWeight: 600,
                "&:hover": { textDecoration: 'underline' } 
              }}
            >
              Forgot Password?
            </Typography>
          </Box>
        </Box>

        <Button 
          type="submit"
          variant="contained" 
          color="primary" 
          fullWidth 
          disabled={loading}
          sx={{ py: 1.5, fontSize: '1rem', fontWeight: 700 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
        </Button>
      </Stack>
    </Box>
  );
};

export default SignInForm;
