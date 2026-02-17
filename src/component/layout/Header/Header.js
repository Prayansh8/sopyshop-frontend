import React, { useState } from "react";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Badge, 
  Box, 
  Container, 
  Avatar, 
  Menu, 
  MenuItem, 
  Tooltip,
  useTheme,
  alpha
} from "@mui/material";
import { 
  Search, 
  ShoppingCart, 
  DarkMode, 
  LightMode, 
  Menu as MenuIcon 
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useColorMode } from "../../../ThemeContext";
import logo from "../../../images/logo.png";
import profile from "./admin.jpeg";

export default function Header({ isAuthenticated }) {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.loadUser);
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        bgcolor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        color: theme.palette.text.primary
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Logo Section */}
          <Box 
            component={Link} 
            to="/" 
            sx={{ 
              display: "flex", 
              alignItems: "center", 
              textDecoration: "none",
              mr: 2
            }}
          >
            <img src={logo} alt="sopyshop" style={{ height: "40px", marginRight: "10px" }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 800,
                letterSpacing: ".1rem",
                color: theme.palette.primary.main,
                display: { xs: "none", md: "flex" }
              }}
            >
              SOPYSHOP
            </Typography>
          </Box>

          {/* Navigation Links - Desktop */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            <Button component={Link} to="/" sx={{ color: theme.palette.text.primary }}>Home</Button>
            <Button component={Link} to="/products" sx={{ color: theme.palette.text.primary }}>Products</Button>
            {userInfo?.user?.role === 'admin' && (
               <Button component={Link} to="/admin/dashboard" sx={{ color: theme.palette.text.primary }}>Dashboard</Button>
            )}
          </Box>

          {/* Action Icons Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1.5 } }}>
            <IconButton onClick={() => navigate("/search")} color="inherit">
              <Search />
            </IconButton>

            <Tooltip title="Toggle Theme">
              <IconButton onClick={toggleColorMode} color="inherit">
                {theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Tooltip>

            <IconButton onClick={() => navigate("/cart")} color="inherit">
              <Badge badgeContent={cartItems.length} color="primary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {/* Profile Section */}
            <Box sx={{ ml: 1 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, border: `2px solid ${alpha(theme.palette.primary.main, 0.5)}` }}>
                  <Avatar 
                    alt="User Profile" 
                    src={userInfo?.user?.avatar || profile} 
                    sx={{ width: 35, height: 35 }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => { handleCloseUserMenu(); navigate("/account"); }}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={() => { handleCloseUserMenu(); navigate("/orders"); }}>
                  <Typography textAlign="center">Orders</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" color="error">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
