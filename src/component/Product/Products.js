import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productAction";
import ProductCard from "../Home/ProductCard";
import Loader from "../layout/Loader/Loader";
import MataData from "../layout/MataData";
import { useParams } from "react-router-dom";
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Slider, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemButton,
  Pagination,
  Button,
  useTheme,
  alpha,
  Divider,
  Drawer,
  IconButton,
  useMediaQuery,
  Breadcrumbs,
  Link as MuiLink,
  Stack
} from "@mui/material";
import { FilterList, NavigateNext, Tune } from "@mui/icons-material";
import { settingsConfig } from "../../settingsConfig";

const categories = [
  "Luxury Soaps",
  "Bath Salts",
  "Essential Oils",
  "Spa Gift Sets",
  "Clothes",
  "Shoes",
  "Phone",
  "Laptop",
  "Camera",
  "Headphones"
];

export default function Products() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const { keyword } = useParams();
  const [price, setPrice] = useState([0, 500000]);
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const { products, loading, productsCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  const handlePriceChange = (event, newPrice) => {
    setPrice(newPrice);
  };

  const handleCategoryClick = (cat) => {
    setCategory(cat === category ? "" : cat);
    if (isMobile) setDrawerOpen(false);
  };

  useEffect(() => {
    dispatch(getProducts(keyword, price, currentPage, category));
  }, [dispatch, keyword, price, currentPage, category]);

  const FilterSidebar = () => (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
        <Tune color="primary" />
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Filters
        </Typography>
      </Stack>
      
      <Divider sx={{ mb: 4, opacity: 0.6 }} />
      
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700, fontSize: '0.9rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1 }}>
        Price Range
      </Typography>
      <Box sx={{ px: 1, mb: 5 }}>
        <Slider
          value={price}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={500000}
          sx={{ 
            color: theme.palette.primary.main,
            '& .MuiSlider-thumb': {
              width: 20,
              height: 20,
              border: `2px solid currentColor`,
              bgcolor: 'background.paper',
            }
          }}
        />
        <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
          <Typography variant="caption" sx={{ fontWeight: 600 }}>₹{price[0]}</Typography>
          <Typography variant="caption" sx={{ fontWeight: 600 }}>₹{price[1]}</Typography>
        </Stack>
      </Box>

      <Divider sx={{ mb: 4, opacity: 0.6 }} />

      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700, fontSize: '0.9rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1 }}>
        Categories
      </Typography>
      <List sx={{ pt: 0 }}>
        {categories.map((cat) => (
          <ListItem key={cat} disablePadding>
            <ListItemButton 
              selected={category === cat}
              onClick={() => handleCategoryClick(cat)}
              sx={{ 
                borderRadius: '12px',
                mb: 0.5,
                transition: settingsConfig.transition,
                '&.Mui-selected': {
                  bgcolor: alpha(theme.palette.primary.main, 0.12),
                  color: theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                  }
                },
                '&:hover': {
                  bgcolor: alpha(theme.palette.divider, 0.05),
                }
              }}
            >
              <ListItemText 
                primary={cat} 
                primaryTypographyProps={{ 
                  variant: 'body2', 
                  fontWeight: category === cat ? 700 : 500,
                  fontSize: '0.925rem'
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
      <MataData title={"Sopyshop | Premium Collections"} />
      <Container maxWidth="xl">
        {/* Header Navigation */}
        <Box sx={{ mb: 5 }}>
          <Breadcrumbs separator={<NavigateNext fontSize="small" sx={{ color: 'text.disabled' }} />} sx={{ mb: 2 }}>
            <MuiLink underline="hover" color="inherit" href="/" sx={{ fontSize: '0.875rem' }}>Home</MuiLink>
            <Typography color="text.primary" sx={{ fontSize: '0.875rem', fontWeight: 600 }}>Products</Typography>
          </Breadcrumbs>
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2}>
            <Typography variant="h3" sx={{ fontWeight: 800 }}>
              {category ? category : "All Collections"}
              {keyword && <Typography component="span" variant="h3" color="text.secondary"> &nbsp;/&nbsp; "{keyword}"</Typography>}
            </Typography>
            {isMobile && (
              <Button 
                variant="outlined" 
                startIcon={<FilterList />} 
                onClick={() => setDrawerOpen(true)}
                sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700 }}
              >
                Filter Products
              </Button>
            )}
          </Stack>
        </Box>

        <Grid container spacing={4}>
          {/* Desktop Filter Sidebar */}
          {!isMobile && (
            <Grid item md={3} lg={2.5}>
              <Paper 
                elevation={0} 
                sx={{ 
                  position: 'sticky',
                  top: 100,
                  border: `1px solid ${alpha(theme.palette.divider, 0.12)}`, 
                  borderRadius: 4,
                  boxShadow: theme.palette.mode === 'light' 
                    ? settingsConfig.styles.boxShadowLight 
                    : settingsConfig.styles.boxShadowDark,
                }}
              >
                <FilterSidebar />
              </Paper>
            </Grid>
          )}

          {/* Product Listing Grid */}
          <Grid item xs={12} md={9} lg={9.5}>
            {loading ? (
              <Loader />
            ) : (
              <Box>
                {products && products.length === 0 ? (
                  <Paper sx={{ textAlign: 'center', py: 12, borderRadius: 4, bgcolor: alpha(theme.palette.divider, 0.02), border: `1px dashed ${theme.palette.divider}` }}>
                    <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 600 }}>No products matched your search</Typography>
                    <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>Try adjusting your filters or search terms</Typography>
                  </Paper>
                ) : (
                  <>
                    <Grid container spacing={3} alignItems="stretch">
                      {products && products.map((item) => (
                        <Grid item key={item._id} xs={6} md={3} lg={3} xl={3} sx={{ display: 'flex' }}>
                          <ProductCard product={item} />
                        </Grid>
                      ))}
                    </Grid>

                    <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
                      <Pagination
                        count={Math.ceil(productsCount / (resultPerPage || 8))}
                        page={currentPage}
                        onChange={(e, v) => setCurrentPage(v)}
                        color="primary"
                        size="large"
                        sx={{
                          '& .MuiPaginationItem-root': {
                            borderRadius: '12px',
                            fontWeight: 700,
                            px: 2
                          },
                          '& .Mui-selected': {
                            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`
                          }
                        }}
                      />
                    </Box>
                  </>
                )}
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Mobile Swipeable Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 300, borderTopRightRadius: 20, borderBottomRightRadius: 20 } }}
      >
        <FilterSidebar />
      </Drawer>
    </Box>
  );
}
