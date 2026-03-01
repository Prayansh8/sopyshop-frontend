import React, { useState, useEffect } from "react";
import { 
  Box, 
  Paper, 
  Typography, 
  Stack, 
  TextField, 
  Button, 
  IconButton, 
  InputAdornment, 
  useTheme, 
  alpha,
  CircularProgress,
  Tooltip
} from "@mui/material";
import { 
  EmailOutlined, 
  ArrowBack, 
  SendOutlined,
  CheckCircleOutline
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, forgotPassword } from "../../redux/actions/userAction";
import Metadata from "../../components/layout/Metadata";

const ForgotPassword = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector((state) => state.forgotPassword || {});

  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      toast.success(message);
      setIsSuccess(true);
    }
  }, [dispatch, error, message]);

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
    <>
      <Metadata title="Forgot Password | Sopyshop" />
      <Box 
        sx={{ 
          flex: 1,
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          position: 'relative',
          overflow: 'hidden',
          p: 2,
          py: { xs: 8, md: 10 },
          background: theme.palette.mode === 'light'
              ? `radial-gradient(circle at 10% 20%, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 40%), 
                 radial-gradient(circle at 90% 80%, ${alpha(theme.palette.secondary.main, 0.08)} 0%, transparent 40%),
                 ${theme.palette.background.default}`
              : `radial-gradient(circle at 10% 20%, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 40%), 
                 radial-gradient(circle at 90% 80%, ${alpha(theme.palette.secondary.main, 0.15)} 0%, transparent 40%),
                 ${theme.palette.background.default}`
        }}
      >
        {/* Back Button */}
        <Box sx={{ position: 'absolute', top: 24, left: 24, zIndex: 10 }}>
          <Tooltip title="Back to Login">
            <IconButton 
              component={Link} 
              to="/login"
              sx={{ 
                bgcolor: alpha(theme.palette.background.paper, 0.8),
                backdropFilter: 'blur(10px)',
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                '&:hover': { bgcolor: theme.palette.background.paper }
              }}
            >
              <ArrowBack fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <Paper 
          elevation={0}
          sx={{ 
            width: '100%',
            maxWidth: 500,
            p: { xs: 4, md: 6 },
            borderRadius: 6, 
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: theme.palette.mode === 'light' 
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.08)' 
              : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            bgcolor: alpha(theme.palette.background.paper, 0.7),
            backdropFilter: 'blur(20px)',
            textAlign: 'center'
          }}
        >
          {!isSuccess ? (
            <Stack spacing={4}>
              <Box>
                <Box 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    borderRadius: '50%', 
                    bgcolor: alpha(theme.palette.primary.main, 0.1), 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3
                  }}
                >
                  <EmailOutlined sx={{ fontSize: 40, color: 'primary.main' }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 900, mb: 1.5, letterSpacing: '-0.02em' }}>
                  Forgot Password?
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Enter your email address and we'll send you a link to reset your password.
                </Typography>
              </Box>

              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    required
                    label="Email Address"
                    fullWidth
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

                  <Button 
                    type="submit"
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    disabled={loading}
                    endIcon={!loading && <SendOutlined />}
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
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Send Reset Link"}
                  </Button>
                </Stack>
              </Box>
            </Stack>
          ) : (
            <Stack spacing={4} alignItems="center">
              <Box 
                sx={{ 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%', 
                  bgcolor: alpha(theme.palette.success.main, 0.1), 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mb: 3
                }}
              >
                <CheckCircleOutline sx={{ fontSize: 40, color: 'success.main' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 900, mb: 1.5, letterSpacing: '-0.02em' }}>
                Check Your Email
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500, maxWidth: 350 }}>
                We've sent a password reset link to <Box component="span" sx={{ color: 'text.primary', fontWeight: 700 }}>{email}</Box>. Please check your inbox.
              </Typography>
              <Button 
                component={Link}
                to="/login"
                variant="outlined"
                sx={{ 
                  borderRadius: 3, 
                  px: 4, 
                  py: 1.5, 
                  fontWeight: 800,
                  textTransform: 'none',
                  borderWidth: '2px',
                  '&:hover': { borderWidth: '2px' }
                }}
              >
                Back to Login
              </Button>
            </Stack>
          )}

          <Box sx={{ mt: 6, pt: 4, borderTop: `1px solid ${alpha(theme.palette.divider, 0.05)}` }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
              Still having trouble? <Link to="/support" style={{ color: theme.palette.primary.main, textDecoration: 'none' }}>Contact Support</Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default ForgotPassword;
