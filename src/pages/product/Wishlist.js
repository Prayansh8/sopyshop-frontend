import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../components/common/ProductCard";
import { ProductGridSkeleton } from "../../components/common/ProductSkeleton";
import Metadata from "../../components/layout/Metadata";
import { 
  Box, 
   
  Typography, 
  Grid, 
  Paper, 
  Button,
  useTheme,
  alpha,
  Breadcrumbs,
  Link as MuiLink,
  Stack
} from "@mui/material";
import { NavigateNext, Favorite, FavoriteBorder, ShoppingCart } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

export default function Wishlist() {
  const theme = useTheme();
  const navigate = useNavigate();

  const { products, loading } = useSelector((state) => state.wishlist);
  const { isAuthenticated } = useSelector((state) => state.loadUser);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Wishlist is now pre-fetched in App.js for authenticated users

  return (
    <Box sx={{ bgcolor: "background.default", flex: 1, py: 4 }}>
      <Metadata title={"My Wishlist | Sopyshop"} />
      <Box maxWidth="xl">
        <Box sx={{ mb: 5 }}>
          <Breadcrumbs separator={<NavigateNext fontSize="small" sx={{ color: 'text.disabled' }} />} sx={{ mb: 2 }}>
            <MuiLink component={Link} underline="hover" color="inherit" to="/" sx={{ fontSize: '0.875rem' }}>Home</MuiLink>
            <Typography color="text.primary" sx={{ fontSize: '0.875rem', fontWeight: 600 }}>Wishlist</Typography>
          </Breadcrumbs>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Favorite color="primary" sx={{ fontSize: '2.5rem' }} />
            <Typography variant="h3" sx={{ fontWeight: 800 }}>
              My Wishlist
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600, mt: 1 }}>
              ({products?.length || 0} Items)
            </Typography>
          </Stack>
        </Box>

        {loading ? (
          <ProductGridSkeleton />
        ) : (
          <Box>
            {products && products.length === 0 ? (
              <Paper 
                elevation={0}
                sx={{ 
                  textAlign: 'center', 
                  py: 12, 
                  borderRadius: 6, 
                  bgcolor: alpha(theme.palette.divider, 0.02), 
                  border: `1px dashed ${theme.palette.divider}` 
                }}
              >
                <FavoriteBorder sx={{ fontSize: '5rem', color: 'text.disabled', mb: 2, opacity: 0.5 }} />
                <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 600 }}>Your wishlist is empty</Typography>
                <Typography variant="body2" color="text.disabled" sx={{ mt: 1, mb: 4 }}>Add items that you find interesting to save them for later!</Typography>
                <Button 
                  component={Link} 
                  to="/products" 
                  variant="contained" 
                  size="large"
                  startIcon={<ShoppingCart />}
                  sx={{ px: 4, py: 1.5, borderRadius: 3, fontWeight: 700 }}
                >
                  Start Shopping
                </Button>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {products && products.map((item) => (
                  <Grid item key={item._id} xs={12} sm={6} md={4} lg={4} sx={{ display: 'flex' }}>
                    <ProductCard product={item} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

