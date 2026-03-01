import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/common/ProductCard";
import Metadata from "../components/layout/Metadata";
import { ProductGridSkeleton } from "../components/common/ProductSkeleton";
import {
  Box,
  Typography,

  Button,
  Grid,
  useTheme,
  Stack,
  alpha,
  Divider
} from "@mui/material";
import { ArrowDownward, ShoppingBag, Devices, HomeOutlined, Checkroom, NavigateNext, StarRate, LocalGroceryStore, Brush } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ProductSection = ({ title, subtitle, icon, products, categoryLink, theme, loading }) => {
  if (!loading && (!products || products.length === 0)) return null;

  return (
    <Box sx={{ py: 6, px: 2 }}>
      <Box sx={{ mb: 6, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <Box>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
            <Box sx={{ p: 1, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', display: 'flex' }}>
              {icon}
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1, color: 'text.primary' }}>
              {title}
            </Typography>
          </Stack>
          <Typography variant="h6" sx={{ fontWeight: 500, color: 'text.secondary' }}>
            {subtitle}
          </Typography>
        </Box>
        {!loading && (
          <Button
            component={Link}
            to={categoryLink}
            endIcon={<NavigateNext />}
            sx={{ fontWeight: 800, px: 3, borderRadius: 3, display: { xs: 'none', sm: 'flex' } }}
          >
            View All
          </Button>
        )}
      </Box>

      {loading ? (
        <ProductGridSkeleton count={3} md={4} lg={4} />
      ) : (
        <Grid container spacing={2}>
          {products?.map((item) => (
            <Grid item key={item._id} size={{ xs: 3, md: 3, lg: 3 }}>
              <ProductCard product={item} />
            </Grid>
          ))}
        </Grid>
      )
      }

      {
        !loading && (
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
        )
      }
    </Box >
  );
};

export const Home = () => {
  const theme = useTheme();
  const { loading, allProducts: products } = useSelector((state) => state.products);
  const { categories = [] } = useSelector((state) => state.categories || {});

  // Categories are now pre-fetched in App.js

  const featured = useMemo(() => products?.slice(0, 8), [products]);

  const techProducts = useMemo(() => {
    const techCategoryNames = ["electronics", "Electronics & Gadgets", "Computer & Accessories", "smartphones", "laptops"];
    return products?.filter(p => {
      const categoryId = p.category?._id || p.category;
      const catName = categories?.find(c => c._id === categoryId)?.name || p.category?.name || (typeof p.category === 'string' ? p.category : "");
      return catName && techCategoryNames.some(tc => catName.toLowerCase() === tc.toLowerCase());
    }).slice(0, 4);
  }, [products, categories]);

  const houseDecoProducts = useMemo(() => {
    const homeCategoryNames = ["furniture", "Home Decor", "home-decoration", "House Decoration"];
    return products?.filter(p => {
      const categoryId = p.category?._id || p.category;
      const catName = categories?.find(c => c._id === categoryId)?.name || p.category?.name || (typeof p.category === 'string' ? p.category : "");
      return catName && homeCategoryNames.some(hc => catName.toLowerCase() === hc.toLowerCase());
    }).slice(0, 4);
  }, [products, categories]);

  const fashionProducts = useMemo(() => {
    const fashionCategoryNames = ["fashion", "Fashion & Lifestyle", "tops", "womens-dresses", "mens-shirts", "mens-shoes", "womens-shoes", "womens-bags", "womens-jewellery"];
    return products?.filter(p => {
      const categoryId = p.category?._id || p.category;
      const catName = categories?.find(c => c._id === categoryId)?.name || p.category?.name || (typeof p.category === 'string' ? p.category : "");
      return catName && fashionCategoryNames.some(fc => catName.toLowerCase() === fc.toLowerCase());
    }).slice(0, 4);
  }, [products, categories]);

  const groceryProducts = useMemo(() => {
    const groceryCategoryNames = ["groceries", "Food & Beverage"];
    return products?.filter(p => {
      const categoryId = p.category?._id || p.category;
      const catName = categories?.find(c => c._id === categoryId)?.name || p.category?.name || (typeof p.category === 'string' ? p.category : "");
      return catName && groceryCategoryNames.some(gc => catName.toLowerCase() === gc.toLowerCase());
    }).slice(0, 4);
  }, [products, categories]);

  const beautyProducts = useMemo(() => {
    const beautyCategoryNames = ["beauty", "fragrances", "skincare", "Personal Care"];
    return products?.filter(p => {
      const categoryId = p.category?._id || p.category;
      const catName = categories?.find(c => c._id === categoryId)?.name || p.category?.name || (typeof p.category === 'string' ? p.category : "");
      return catName && beautyCategoryNames.some(bc => catName.toLowerCase() === bc.toLowerCase());
    }).slice(0, 4);
  }, [products, categories]);

  return (
    <Box>
      <Metadata title={"Sopyshop | Your One-Stop Store"} />

      {/* Banner Section */}
      <Box
        sx={{
          flex: 1,
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          background: theme.palette.mode === 'light'
            ? `radial-gradient(circle at 20% 30%, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 50%), 
               radial-gradient(circle at 80% 70%, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 50%),
               ${alpha(theme.palette.background.default, 1)}`
            : `radial-gradient(circle at 20% 30%, ${alpha(theme.palette.primary.main, 0.2)} 0%, transparent 50%), 
               radial-gradient(circle at 80% 70%, ${alpha(theme.palette.secondary.main, 0.15)} 0%, transparent 50%),
               ${theme.palette.background.default}`,
          position: "relative",
          overflow: "hidden",
          width: "100%",
          py: { xs: 8, md: 0 }
        }}
      >
        {/* Animated background elements */}
        <Box 
          sx={{ 
            position: 'absolute', 
            width: '100%', 
            height: '100%', 
            pointerEvents: 'none',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-10%',
              left: '-10%',
              width: '120%',
              height: '120%',
              backgroundImage: theme.palette.mode === 'dark' 
                ? 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)' 
                : 'radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
              maskImage: 'radial-gradient(ellipse at center, black, transparent)',
            }
          }} 
        />

        <Box maxWidth="lg" sx={{ px: 3, position: 'relative', zIndex: 1 }}>
          <Stack spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <Typography 
              variant="overline" 
              sx={{ 
                fontWeight: 800, 
                letterSpacing: 4, 
                color: 'primary.main',
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                px: 2,
                py: 0.5,
                borderRadius: 2
              }}
            >
              EXPERIENCE THE FUTURE
            </Typography>
            <Typography
              variant="h1"
              color="text.primary"
              sx={{
                fontSize: { xs: "3.5rem", md: "6rem" },
                fontWeight: 950,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                gap: { xs: 1, md: 2 }
              }}
            >
              Welcome 
              <Box 
                component="span" 
                sx={{ 
                  bgcolor: theme.palette.primary.main, 
                  color: '#fff', 
                  px: 2, 
                  py: 1, 
                  borderRadius: 3,
                  fontSize: { xs: "2.5rem", md: "4.5rem" },
                  transform: 'rotate(-2deg)',
                  boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.4)}`,
                  display: 'inline-block',
                  mx: 1
                }}
              >
                to
              </Box>
              <Box component="span" sx={{ color: theme.palette.primary.main }}>Sopyshop</Box>
            </Typography>
          </Stack>
          
          <Typography
            variant="h5"
            sx={{
              mb: 6,
              color: theme.palette.text.secondary,
              maxWidth: "700px",
              mx: "auto",
              lineHeight: 1.6,
              fontWeight: 500,
              fontSize: { xs: '1.1rem', md: '1.4rem' }
            }}
          >
            From latest electronics to modern home decor and fashion – curated with precision for your lifestyle.
          </Typography>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingBag />}
              href="#featured"
              sx={{ 
                py: 2.2, 
                px: 6, 
                fontSize: "1.1rem", 
                borderRadius: 4, 
                fontWeight: 800,
                boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.25)}`,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 25px 50px ${alpha(theme.palette.primary.main, 0.35)}`,
                }
              }}
            >
              Start Shopping
            </Button>
            <Button
              variant="outlined"
              size="large"
              endIcon={<ArrowDownward />}
              href="#tech"
              sx={{ 
                py: 2.2, 
                px: 6, 
                fontSize: "1.1rem", 
                borderRadius: 4, 
                fontWeight: 800,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  transform: 'translateY(-4px)',
                }
              }}
            >
              Explore Tech
            </Button>
          </Stack>
        </Box>
      </Box>

      <Box mx="auto" maxWidth="lg">
        {/* Featured Products Section */}
        <Box id="featured" sx={{ py: 5 }}>
          <ProductSection
            title="Featured Products"
            subtitle="Our most loved and handpicked collections"
            icon={<StarRate />}
            products={featured}
            categoryLink="/products"
            theme={theme}
            loading={loading}
          />
        </Box>

        <Divider sx={{ opacity: 0.5 }} />

        {/* New Sections */}
        <Box id="tech" sx={{ py: 3 }}>
          <ProductSection
            title="Tech & Electronics"
            subtitle="Latest gadgets from Laptops to Smart Watches"
            icon={<Devices />}
            products={techProducts}
            categoryLink="/products?category=Electronics & Gadgets"
            theme={theme}
            loading={loading}
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
            loading={loading}
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
            loading={loading}
          />
        </Box>

        <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
          <ProductSection
            title="Daily Groceries"
            subtitle="Fresh essentials and pantry favorites delivered to you"
            icon={<LocalGroceryStore />}
            products={groceryProducts}
            categoryLink="/products?category=groceries"
            theme={theme}
            loading={loading}
          />
        </Box>

        <Box>
          <ProductSection
            title="Beauty & Glow"
            subtitle="Premium fragrances, skincare and self-care essentials"
            icon={<Brush />}
            products={beautyProducts}
            categoryLink="/products?category=beauty"
            theme={theme}
            loading={loading}
          />
        </Box>
      </Box>


      <Box sx={{ py: 15, textAlign: "center", bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.common.white, 0.02) : alpha(theme.palette.common.black, 0.02) }}>
        <Typography variant="h3" sx={{ fontWeight: 900, mb: 3, color: 'text.primary' }}>Ready to see everything?</Typography>
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
  );
};

