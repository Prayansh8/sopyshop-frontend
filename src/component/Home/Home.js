import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productAction";
import ProductCard from "./ProductCard";
import MataData from "../layout/MataData";
import Loader from "../layout/Loader/Loader";
import { 
  Box, 
  Typography, 
  Container, 
  Button, 
  Grid, 
  useTheme,
  Stack,
  alpha
} from "@mui/material";
import { ArrowDownward, ShoppingBag } from "@mui/icons-material";

export const Home = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ minHeight: "100vh" }}>
          <MataData title={"Sopyshop | Best Quality Soaps & More"} />
          
          {/* Banner Section */}
          <Box 
            sx={{
              height: "70vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              background: theme.palette.mode === 'light'
                ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`
                : `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Container maxWidth="md">
              <Typography 
                variant="h1" 
                sx={{ 
                  mb: 2, 
                  fontSize: { xs: "2.5rem", md: "4rem" },
                  color: theme.palette.text.primary,
                  fontWeight: 800
                }}
              >
                Welcome to <span style={{ color: theme.palette.primary.main }}>Sopyshop</span>
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4, 
                  color: theme.palette.text.secondary,
                  maxWidth: "600px",
                  mx: "auto"
                }}
              >
                Discover our premium range of organic soaps, tech gadgets, and fashion essentials curated just for you.
              </Typography>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button 
                  variant="contained" 
                  size="large" 
                  startIcon={<ShoppingBag />}
                  href="#product"
                  sx={{ py: 1.5, px: 4, fontSize: "1.1rem" }}
                >
                  Shop Now
                </Button>
                <Button 
                  variant="outlined" 
                  size="large" 
                  endIcon={<ArrowDownward />}
                  href="#product"
                  sx={{ py: 1.5, px: 4, fontSize: "1.1rem" }}
                >
                  Explore
                </Button>
              </Stack>
            </Container>
          </Box>

          {/* Featured Products Section */}
          <Container sx={{ py: 8 }} id="product">
            <Box sx={{ mb: 6, textAlign: "center" }}>
              <Typography variant="h2" sx={{ mb: 1 }}>
                Featured Products
              </Typography>
              <Box 
                sx={{ 
                  width: "60px", 
                  height: "4px", 
                  bgcolor: theme.palette.primary.main, 
                  mx: "auto",
                  borderRadius: "2px"
                }} 
              />
            </Box>

            <Grid container spacing={2}>
              {products &&
                products.slice(0, 8).map((item) => (
                  <Grid item key={item._id} xs={6} md={4} lg={3}>
                    <ProductCard product={item} />
                  </Grid>
                ))}
            </Grid>
            
            <Box sx={{ mt: 8, textAlign: "center" }}>
              <Button 
                variant="outlined" 
                size="large" 
                color="primary"
                href="/products"
                sx={{ px: 6 }}
              >
                View All Products
              </Button>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
};
