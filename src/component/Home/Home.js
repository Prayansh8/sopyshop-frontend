import React, { useEffect, useMemo } from "react";
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
  alpha,
  Divider
} from "@mui/material";
import { ArrowDownward, ShoppingBag, Devices, HomeOutlined, Checkroom, NavigateNext } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ProductSection = ({ title, subtitle, icon, products, categoryLink, theme }) => (
  <Container sx={{ py: 10 }}>
    <Box sx={{ mb: 6, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
      <Box>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
          <Box sx={{ p: 1, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', display: 'flex' }}>
            {icon}
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1 }}>
            {title}
          </Typography>
        </Stack>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
          {subtitle}
        </Typography>
      </Box>
      <Button 
        component={Link} 
        to={categoryLink} 
        endIcon={<NavigateNext />} 
        sx={{ fontWeight: 800, px: 3, borderRadius: 3, display: { xs: 'none', sm: 'flex' } }}
      >
        View All
      </Button>
    </Box>

    <Grid container spacing={3} justifyContent="space-between">
      {products && products.slice(0, 4).map((item) => (
        <Grid item key={item._id} xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex' }}>
          <ProductCard product={item} />
        </Grid>
      ))}
    </Grid>
    
    <Box sx={{ mt: 5, display: { xs: 'flex', sm: 'none' }, justifyContent: 'center' }}>
      <Button 
        component={Link} 
        to={categoryLink} 
        variant="outlined"
        fullWidth
        sx={{ py: 1.5, borderRadius: 3, fontWeight: 800 }}
      >
        View All {title}
      </Button>
    </Box>
  </Container>
);

export const Home = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    // Increase limit to 100 to have enough products for all sections on home page
    dispatch(getProducts("", [0, 1000000], 1, "", "", 100));
  }, [dispatch, error]);

  const featured = useMemo(() => products?.slice(0, 8), [products]);
  
  const techProducts = useMemo(() => 
    products?.filter(p => ["Electronics & Gadgets", "Computer & Accessories"].includes(p.category)).slice(0, 4), 
    [products]
  );
  
  const houseDecoProducts = useMemo(() => 
    products?.filter(p => ["Home Decor", "Furniture"].includes(p.category)).slice(0, 4), 
    [products]
  );
  
  const fashionProducts = useMemo(() => 
    products?.filter(p => p.category === "Fashion & Lifestyle").slice(0, 4), 
    [products]
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ minHeight: "100vh" }}>
          <MataData title={"Sopyshop | Your One-Stop Store"} />
          
          {/* Banner Section */}
          <Box 
            sx={{
              height: "75vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              background: theme.palette.mode === 'light'
                ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`
                : `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Container maxWidth="md">
              <Typography 
                variant="h1" 
                color="text.primary"
                sx={{ 
                  mb: 2, 
                  fontSize: { xs: "3rem", md: "5rem" },
                  fontWeight: 900,
                  letterSpacing: '-0.02em'
                }}
              >
                Welcome to <Box component="span" sx={{ color: theme.palette.primary.main }}>Sopyshop</Box>
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 5, 
                  color: theme.palette.text.secondary,
                  maxWidth: "650px",
                  mx: "auto",
                  lineHeight: 1.6
                }}
              >
                From latest electronics to modern home decor and fashion – curated just for you.
              </Typography>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button 
                  variant="contained" 
                  size="large" 
                  startIcon={<ShoppingBag />}
                  href="#featured"
                  sx={{ py: 2, px: 5, fontSize: "1.1rem", borderRadius: 4, fontWeight: 800 }}
                >
                  Shop Now
                </Button>
                <Button 
                  variant="outlined" 
                  size="large" 
                  endIcon={<ArrowDownward />}
                  href="#tech"
                  sx={{ py: 2, px: 5, fontSize: "1.1rem", borderRadius: 4, fontWeight: 800 }}
                >
                  Explore Categories
                </Button>
              </Stack>
            </Container>
          </Box>

          {/* Featured Products Section */}
          <Container sx={{ py: 12 }} id="featured">
            <Box sx={{ mb: 8, textAlign: "center" }}>
              <Typography variant="h2" color="text.primary" sx={{ mb: 2, fontWeight: 900 }}>
                Featured Products
              </Typography>
              <Box 
                sx={{ 
                  width: "80px", 
                  height: "5px", 
                  bgcolor: theme.palette.primary.main, 
                  mx: "auto",
                  borderRadius: "4px"
                }} 
              />
            </Box>

            <Grid container spacing={3} justifyContent="space-between">
              {featured &&
                featured.map((item) => (
                  <Grid item key={item._id} xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex' }}>
                    <ProductCard product={item} />
                  </Grid>
                ))}
            </Grid>
          </Container>

          <Divider sx={{ opacity: 0.5 }} />

          {/* New Sections */}
          <Box id="tech">
            <ProductSection 
              title="Tech & Electronics" 
              subtitle="Latest gadgets from Laptops to Smart Watches"
              icon={<Devices />}
              products={techProducts}
              categoryLink="/products?category=Electronics & Gadgets"
              theme={theme}
            />
          </Box>

          <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
            <ProductSection 
              title="Home & Living" 
              subtitle="Transform your space with modern furniture and decor"
              icon={<HomeOutlined />}
              products={houseDecoProducts}
              categoryLink="/products?category=Home Decor"
              theme={theme}
            />
          </Box>

          <Box>
            <ProductSection 
              title="Fashion Store" 
              subtitle="Premium apparel and footwear for your style"
              icon={<Checkroom />}
              products={fashionProducts}
              categoryLink="/products?category=Fashion & Lifestyle"
              theme={theme}
            />
          </Box>
          
          <Box sx={{ py: 15, textAlign: "center", bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.common.white, 0.02) : alpha(theme.palette.common.black, 0.02) }}>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 3 }}>Ready to see everything?</Typography>
            <Button 
              variant="contained" 
              size="large" 
              component={Link}
              to="/products"
              sx={{ px: 8, py: 2.5, borderRadius: 5, fontWeight: 900, fontSize: '1.2rem' }}
            >
              Browse Full Catalog
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};
