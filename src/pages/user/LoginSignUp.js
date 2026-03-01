import React, { useEffect, useState } from "react";
import { 
  Box, 
  Tab, 
  Paper, 
  Typography, 
  Stack, 
  useTheme, 
  alpha,
  IconButton,
  Tooltip,
  Divider
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, googleLogin } from "../../redux/actions/userAction";
import Loader from "../../components/common/Loader";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import SignupForm from "../../components/auth/SignupForm";
import SignInForm from "../../components/auth/SignInForm";
import Metadata from "../../components/layout/Metadata";
import { ArrowBack } from "@mui/icons-material";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginSignUp() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, isAuthenticated } = useSelector((state) => state.loadUser);
  const [tabValue, setTabValue] = useState("1");

  const redirect = location.search ? (location.search.split("=")[1].startsWith("/") ? location.search.split("=")[1] : `/${location.search.split("=")[1]}`) : "/";

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, isAuthenticated, navigate, redirect]);

  return (
    <>
      <Metadata title="Authentication | Sopyshop" />
      {loading ? (
        <Loader />
      ) : (
        <Box 
          sx={{ 
            flex: 1,
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            position: 'relative',
            overflow: 'hidden',
            p: 2,
            py: { xs: 8, md: 12 },
            background: theme.palette.mode === 'light'
                ? `radial-gradient(circle at 10% 20%, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 40%), 
                   radial-gradient(circle at 90% 80%, ${alpha(theme.palette.secondary.main, 0.08)} 0%, transparent 40%),
                   ${theme.palette.background.default}`
                : `radial-gradient(circle at 10% 20%, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 40%), 
                   radial-gradient(circle at 90% 80%, ${alpha(theme.palette.secondary.main, 0.15)} 0%, transparent 40%),
                   ${theme.palette.background.default}`
          }}
        >
          {/* Back to Home Button */}
          <Box sx={{ position: 'absolute', top: 24, left: 24, zIndex: 10 }}>
            <Tooltip title="Back to Home">
              <IconButton 
                component={Link} 
                to="/"
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
              display: 'flex',
              width: '100%',
              maxWidth: 1200,
              minHeight: 650,
              borderRadius: 6, 
              overflow: 'hidden',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              boxShadow: theme.palette.mode === 'light' 
                ? '0 25px 50px -12px rgba(0, 0, 0, 0.08)' 
                : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              bgcolor: alpha(theme.palette.background.paper, 0.7),
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Visual Side (Desktop) */}
            <Box 
              sx={{ 
                flex: 1.2,
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                justifyContent: 'center',
                p: 6,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                color: '#fff',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  opacity: 0.1,
                  backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }
              }}
            >
              <Typography 
                variant="h2" 
                sx={{ 
                  fontWeight: 900, 
                  lineHeight: 1.1, 
                  mb: 3,
                  letterSpacing: '-0.03em',
                  textShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}
              >
                Elevate Your <br />
                <Box component="span" sx={{ color: alpha('#fff', 0.6) }}>Shopping</Box> <br />
                Experience.
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.8, fontWeight: 500, mb: 4, maxWidth: 300 }}>
                Join thousands of shoppers and discover the latest trends in beauty, fashion, and technology.
              </Typography>
              
              <Stack direction="row" spacing={4} sx={{ mt: 'auto' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800 }}>10k+</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>Orders Delivered</Typography>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800 }}>4.9/5</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>User Rating</Typography>
                </Box>
              </Stack>
            </Box>

            {/* Form Side */}
            <Box sx={{ flex: 1, p: { xs: 3, md: 6 }, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: '-0.01em', mb: 1 }}>
                  {tabValue === "1" ? "Welcome Back" : "Create Account"}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  {tabValue === "1" 
                    ? "Start your shopping journey exactly where you left off." 
                    : "Join us today and get exclusive early access to our major sales."}
                </Typography>
              </Box>

              <TabContext value={tabValue}>
                <Box 
                  sx={{ 
                    bgcolor: alpha(theme.palette.divider, 0.05),
                    p: 0.5,
                    borderRadius: 3,
                    mb: 4
                  }}
                >
                  <TabList 
                    onChange={handleTabChange} 
                    variant="fullWidth"
                    centered
                    sx={{
                      minHeight: 45,
                      '& .MuiTabs-indicator': {
                        height: '100%',
                        borderRadius: 2.5,
                        zIndex: 0,
                        backgroundColor: theme.palette.mode === 'light' ? '#fff' : alpha(theme.palette.primary.main, 0.2),
                        boxShadow: theme.palette.mode === 'light' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                      },
                      '& .MuiTab-root': { 
                        fontWeight: 700, 
                        textTransform: 'none', 
                        fontSize: '0.95rem',
                        zIndex: 1,
                        minHeight: 45,
                        borderRadius: 2.5,
                        transition: '0.3s',
                        '&.Mui-selected': {
                          color: theme.palette.primary.main,
                        }
                      }
                    }}
                  >
                    <Tab label="Login" value="1" disableRipple />
                    <Tab label="Sign Up" value="2" disableRipple />
                  </TabList>
                </Box>
                
                <TabPanel value="1" sx={{ p: 0, flexGrow: 1 }}>
                  <SignInForm />
                </TabPanel>
                <TabPanel value="2" sx={{ p: 0, flexGrow: 1 }}>
                  <SignupForm />
                </TabPanel>
              </TabContext>

              {/* Google OAuth Section */}
              <Box sx={{ mt: 2 }}>
                <Divider sx={{ mb: 3 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800, textTransform: 'uppercase', px: 2 }}>
                    Or continue with
                  </Typography>
                </Divider>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      dispatch(googleLogin(credentialResponse.credential));
                    }}
                    onError={() => {
                      toast.error("Google Login Failed");
                    }}
                    useOneTap
                    theme={theme.palette.mode === 'dark' ? 'filled_blue' : 'outline'}
                    shape="pill"
                    width="100%"
                  />
                </Box>
              </Box>

              <Box sx={{ mt: 'auto', pt: 4, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  SOPYSHOP © 2026. All rights reserved.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );
}
