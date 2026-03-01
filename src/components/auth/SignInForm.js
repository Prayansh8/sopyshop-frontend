import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Typography, 
  IconButton, 
  InputAdornment, 
  CircularProgress,
  Stack,
  Box,
  useTheme,
  alpha
} from '@mui/material';
import { 
  EmailOutlined, 
  LockOutlined, 
  Visibility, 
  VisibilityOff,
  ArrowForward
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/userAction';
import { Link } from 'react-router-dom';

const SignInForm = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loadUser);
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
    dispatch(loginUser(loginData));
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
      <Stack spacing={3.5}>
        <TextField
          required
          label="Email Address"
          fullWidth
          name="email"
          type="email"
          value={loginData.email}
          onChange={handleChange}
          variant="outlined"
          sx={inputStyles}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlined sx={{ color: theme.palette.primary.main, mr: 0.5 }} />
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
            sx={inputStyles}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined sx={{ color: theme.palette.primary.main, mr: 0.5 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: 'text.secondary' }}>
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.5 }}>
            <Typography 
              variant="body2" 
              component={Link} 
              to="/password/forgot" 
              sx={{ 
                color: 'text.secondary', 
                textDecoration: 'none', 
                fontWeight: 600,
                transition: 'all 0.2s',
                "&:hover": { 
                  color: 'primary.main',
                  transform: 'translateX(-2px)'
                } 
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
          endIcon={!loading && <ArrowForward />}
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
          {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In to Your Account"}
        </Button>
      </Stack>
    </Box>
  );
};

export default SignInForm;
