import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist } from "../../actions/wishlistAction";
import ProductCard from "../Home/ProductCard";
import Loader from "../layout/Loader/Loader";
import MataData from "../layout/MataData";
import { 
  Box, 
  Container, 
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
import { Link } from "react-router-dom";

export default function Wishlist() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
      <MataData title={"My Wishlist | Sopyshop"} />
      <Container maxWidth="xl">
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
          <Loader />
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
                  <Grid item key={item._id} xs={6} md={3} lg={3} xl={2.4} sx={{ display: 'flex' }}>
                    <ProductCard product={item} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
}
