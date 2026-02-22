import React, { useEffect, useState } from "react";
import { 
  Box, 
  Tab, 
   
  Paper, 
  Typography, 
  Stack, 
  useTheme, 
  alpha 
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../redux/actions/userAction";
import Loader from "../../components/common/Loader";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import SignupForm from "../../components/auth/SignupForm";
import SignInForm from "../../components/auth/SignInForm";
import Metadata from "../../components/layout/Metadata";
import { settingsConfig } from "../../settingsConfig";

export default function LoginSignUp() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, isAuthenticated } = useSelector((state) => state.loadUser);
  const [tabValue, setTabValue] = useState("1");

  const redirect = location.search ? location.search.split("=")[1] : "/account";

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
      <Metadata title="Login or Register | Sopyshop" />
      {loading ? (
        <Loader />
      ) : (
        <Box 
          sx={{ 
            minHeight: "100vh", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            bgcolor: "background.default",
            py: 8,
            px: 2,
            background: theme.palette.mode === 'light'
                ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`
                : `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)` }}
        >
          <Box maxWidth="sm">
            <Paper 
              elevation={0}
              sx={{ 
                p: { xs: 3, md: 5 }, 
                borderRadius: 4, 
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                boxShadow: theme.palette.mode === 'light' 
                  ? settingsConfig.styles.boxShadowLight 
                  : settingsConfig.styles.boxShadowDark,
                bgcolor: "background.paper",
                overflow: 'hidden'
              }}
            >
              <Stack spacing={3} sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: "primary.main" }}>
                  SOPYSHOP
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Welcome back! Please enter your details.
                </Typography>
              </Stack>

              <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
                  <TabList 
                    onChange={handleTabChange} 
                    variant="fullWidth"
                    sx={{
                      '& .MuiTab-root': { fontWeight: 700, textTransform: 'none', fontSize: '1rem' }
                    }}
                  >
                    <Tab label="Login" value="1" />
                    <Tab label="Register" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1" sx={{ p: 0 }}>
                  <SignInForm />
                </TabPanel>
                <TabPanel value="2" sx={{ p: 0 }}>
                  <SignupForm />
                </TabPanel>
              </TabContext>
            </Paper>
          </Box>
        </Box>
      )}
    </>
  );
}
