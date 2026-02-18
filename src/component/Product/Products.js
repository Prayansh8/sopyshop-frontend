import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, clearErrors } from "../../actions/productAction";
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
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Tooltip,
  Fade,
  Grow
} from "@mui/material";
import { 
  FilterList, 
  NavigateNext, 
  Tune, 
  Sort, 
  Category, 
  LocalOffer, 
  Clear,
  Spa,
  Waves,
  Opacity,
  CardGiftcard,
  Checkroom,
  IceSkating,
  Smartphone,
  Laptop as LaptopIcon,
  CameraAlt,
  Headphones as HeadphonesIcon,
  GridView,
  ViewStream,
  KeyboardArrowDown
} from "@mui/icons-material";
import { toast } from "react-toastify";

const categories = [
  { name: "Luxury Soaps", icon: <Spa fontSize="small" /> },
  { name: "Bath Salts", icon: <Waves fontSize="small" /> },
  { name: "Essential Oils", icon: <Opacity fontSize="small" /> },
  { name: "Spa Gift Sets", icon: <CardGiftcard fontSize="small" /> },
  { name: "Clothes", icon: <Checkroom fontSize="small" /> },
  { name: "Shoes", icon: <IceSkating fontSize="small" /> },
  { name: "Phone", icon: <Smartphone fontSize="small" /> },
  { name: "Laptop", icon: <LaptopIcon fontSize="small" /> },
  { name: "Camera", icon: <CameraAlt fontSize="small" /> },
  { name: "Headphones", icon: <HeadphonesIcon fontSize="small" /> }
];

const sortOptions = [
  { label: "Newest Arrivals", value: "-createdAt" },
  { label: "Price: Low to High", value: "price" },
  { label: "Price: High to Low", value: "-price" },
  { label: "Top Rated", value: "-ratings" },
  { label: "Alphabetical (A-Z)", value: "name" }
];

export default function Products() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const { keyword } = useParams();
  const [price, setPrice] = useState([0, 500000]);
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("-createdAt");
  const [viewMode, setViewMode] = useState("grid");

  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  const handlePriceChange = (event, newPrice) => {
    setPrice(newPrice);
  };

  const handleCategoryClick = (cat) => {
    setCategory(cat === category ? "" : cat);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setPrice([0, 500000]);
    setCategory("");
    setSort("-createdAt");
    setCurrentPage(1);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts(keyword, price, currentPage, category, sort));
  }, [dispatch, keyword, price, currentPage, category, sort, error]);

  const FilterPanel = () => (
    <Box sx={{ p: 4, width: { xs: '100vw', sm: 400 } }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
          Filters
        </Typography>
        <IconButton onClick={() => setDrawerOpen(false)} sx={{ bgcolor: alpha(theme.palette.divider, 0.05) }}>
          <Clear fontSize="small" />
        </IconButton>
      </Stack>

      <Box sx={{ mb: 6 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.secondary', mb: 3, textTransform: 'uppercase', letterSpacing: 1.5 }}>
          Price Range
        </Typography>
        <Box sx={{ px: 2 }}>
          <Slider
            value={price}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={500000}
            sx={{ 
              color: theme.palette.primary.main,
              height: 6,
              '& .MuiSlider-thumb': {
                width: 24,
                height: 24,
                bgcolor: '#fff',
                border: '4px solid currentColor',
                '&:hover, &.Mui-active': { boxShadow: `0 0 0 10px ${alpha(theme.palette.primary.main, 0.1)}` }
              }
            }}
          />
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, bgcolor: alpha(theme.palette.divider, 0.05), px: 1.5, py: 0.5, borderRadius: 1.5 }}>
              ₹{price[0].toLocaleString()}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, bgcolor: alpha(theme.palette.divider, 0.05), px: 1.5, py: 0.5, borderRadius: 1.5 }}>
              ₹{price[1].toLocaleString()}
            </Typography>
          </Stack>
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.secondary', mb: 2, textTransform: 'uppercase', letterSpacing: 1.5 }}>
          Sort Selection
        </Typography>
        <Stack spacing={1}>
          {sortOptions.map((opt) => (
            <Button
              key={opt.value}
              onClick={() => {
                setSort(opt.value);
                setDrawerOpen(false);
              }}
              variant={sort === opt.value ? "contained" : "text"}
              sx={{ 
                justifyContent: 'flex-start', 
                borderRadius: 2, 
                py: 1.5, 
                px: 2,
                fontWeight: sort === opt.value ? 800 : 600,
                textTransform: 'none'
              }}
            >
              {opt.label}
            </Button>
          ))}
        </Stack>
      </Box>

      <Box sx={{ mt: 8 }}>
        <Button 
          fullWidth 
          variant="outlined" 
          onClick={clearFilters}
          sx={{ borderRadius: 3, py: 2, fontWeight: 800, border: `2px solid ${theme.palette.divider}` }}
        >
          Reset All Filters
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <MataData title={"Sopyshop | Collections"} />
      
      {/* Immersive Hero Section */}
      <Box 
        sx={{ 
          pt: { xs: 8, md: 12 }, 
          pb: { xs: 6, md: 10 }, 
          bgcolor: alpha(theme.palette.primary.main, 0.03),
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="xl">
          <Grow in timeout={800}>
            <Box>
              <Breadcrumbs 
                separator={<NavigateNext fontSize="tiny" />} 
                sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}
              >
                <MuiLink underline="hover" color="inherit" href="/" sx={{ fontSize: '0.8rem', fontWeight: 700 }}>Home</MuiLink>
                <Typography color="text.primary" sx={{ fontSize: '0.8rem', fontWeight: 900 }}>Collections</Typography>
              </Breadcrumbs>
              
              <Typography variant="h1" sx={{ fontWeight: 900, mb: 2, letterSpacing: '-0.04em', fontSize: { xs: '2.5rem', md: '4.5rem' } }}>
                The <Box component="span" sx={{ color: 'primary.main' }}>Premium</Box> Catalog
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', fontWeight: 500, lineHeight: 1.6, px: 2 }}>
                Quality is not an act, it is a habit. Discover our carefully curated selection of lifestyle upgrades.
              </Typography>
            </Box>
          </Grow>
        </Container>
      </Box>

      {/* Sticky Horizontal Control Bar */}
      <Box 
        sx={{ 
          position: 'sticky', 
          top: 0, 
          zIndex: 1000, 
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          bgcolor: alpha(theme.palette.background.paper, 0.85),
          backdropFilter: 'blur(20px)',
          py: 2
        }}
      >
        <Container maxWidth="xl">
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            {/* Filter Trigger */}
            <Button 
              startIcon={<Tune fontSize="small" />} 
              onClick={() => setDrawerOpen(true)}
              sx={{ 
                borderRadius: 2.5, 
                px: 3, 
                py: 1, 
                fontWeight: 800, 
                textTransform: 'none',
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) }
              }}
            >
              Filter & Sort
            </Button>

            {/* Scrollable Categories Chips */}
            <Box 
              sx={{ 
                flexGrow: 1, 
                overflowX: 'auto', 
                display: { xs: 'none', md: 'flex' },
                gap: 1.5,
                px: 4,
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' }
              }}
            >
              <Chip
                label="All Collections"
                onClick={() => setCategory("")}
                sx={{ 
                  borderRadius: 2.5, 
                  fontWeight: 800, 
                  px: 1.5, 
                  py: 2.5,
                  bgcolor: category === "" ? 'primary.main' : 'transparent',
                  color: category === "" ? '#fff' : 'text.primary',
                  border: `1px solid ${category === "" ? 'primary.main' : alpha(theme.palette.divider, 0.2)}`,
                  '&:hover': { bgcolor: category === "" ? 'primary.dark' : alpha(theme.palette.divider, 0.1) }
                }}
              />
              {categories.map((cat) => (
                <Chip
                  key={cat.name}
                  icon={React.cloneElement(cat.icon, { style: { color: category === cat.name ? '#fff' : 'inherit' } })}
                  label={cat.name}
                  onClick={() => handleCategoryClick(cat.name)}
                  sx={{ 
                    borderRadius: 2.5, 
                    fontWeight: 700, 
                    px: 1.5, 
                    py: 2.5,
                    bgcolor: category === cat.name ? 'primary.main' : 'transparent',
                    color: category === cat.name ? '#fff' : 'text.primary',
                    border: `1px solid ${category === cat.name ? 'primary.main' : alpha(theme.palette.divider, 0.2)}`,
                    transition: '0.3s',
                    '&:hover': { bgcolor: category === cat.name ? 'primary.dark' : alpha(theme.palette.divider, 0.1) }
                  }}
                />
              ))}
            </Box>

            {/* Results Count & View Toggle */}
            <Stack direction="row" alignItems="center" spacing={3}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary', whiteSpace: 'nowrap' }}>
                <Box component="span" sx={{ color: 'text.primary' }}>{productsCount || 0}</Box> Items
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ height: 20, my: 'auto' }} />
              <Stack direction="row" spacing={0.5}>
                <IconButton 
                    size="small" 
                    onClick={() => setViewMode("grid")}
                    sx={{ color: viewMode === "grid" ? 'primary.main' : 'text.disabled', bgcolor: viewMode === "grid" ? alpha(theme.palette.primary.main, 0.05) : 'transparent' }}
                >
                  <GridView fontSize="small" />
                </IconButton>
                <IconButton 
                    size="small" 
                    onClick={() => setViewMode("list")}
                    sx={{ color: viewMode === "list" ? 'primary.main' : 'text.disabled', bgcolor: viewMode === "list" ? alpha(theme.palette.primary.main, 0.05) : 'transparent' }}
                >
                  <ViewStream fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Main Content Area */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        {loading ? (
          <Loader />
        ) : (
          <Box>
            {/* Active Chips Row */}
            {(category || price[0] !== 0 || price[1] !== 500000 || keyword) && (
              <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                {keyword && <Chip label={`Search: ${keyword}`} onDelete={() => (window.location.href = "/products")} sx={{ borderRadius: 2, fontWeight: 700 }} />}
                {category && <Chip label={`Category: ${category}`} onDelete={() => setCategory("")} sx={{ borderRadius: 2, fontWeight: 700 }} />}
                {(price[0] !== 0 || price[1] !== 500000) && <Chip label={`Price: ₹${price[0]} - ₹${price[1]}`} onDelete={() => setPrice([0, 500000])} sx={{ borderRadius: 2, fontWeight: 700 }} />}
                <Button size="small" onClick={clearFilters} sx={{ fontWeight: 800, textTransform: 'none' }}>Clear All</Button>
              </Box>
            )}

            {!products || products.length === 0 ? (
              <Box sx={{ py: 15, textAlign: 'center' }}>
                <Box sx={{ p: 4, borderRadius: '50%', bgcolor: alpha(theme.palette.error.main, 0.05), display: 'inline-flex', mb: 4 }}>
                   <Tune sx={{ fontSize: 80, color: 'error.light', opacity: 0.5 }} />
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 900, mb: 2 }}>No Matches Found</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 500, mx: 'auto', mb: 5 }}>
                  We couldn't find any products matching your specific selection. Try broadening your filters or clearing them all.
                </Typography>
                <Button variant="contained" onClick={clearFilters} sx={{ borderRadius: 4, px: 6, py: 2, fontWeight: 800 }}>
                  Back to All Products
                </Button>
              </Box>
            ) : (
              <Box>
                <Grid container spacing={4}>
                  {products.map((item, index) => (
                    <Grid item key={item._id} xs={12} sm={6} md={viewMode === "grid" ? 3 : 12} lg={viewMode === "grid" ? 3 : 12}>
                      <Grow in timeout={300 + index * 100}>
                        <Box>
                            <ProductCard product={item} horizontal={viewMode === "list"} />
                        </Box>
                      </Grow>
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ display: "flex", justifyContent: "center", mt: 15 }}>
                  <Pagination
                    count={Math.ceil(productsCount / (resultPerPage || 8))}
                    page={currentPage}
                    onChange={(e, v) => setCurrentPage(v)}
                    color="primary"
                    size="large"
                    sx={{
                      '& .MuiPaginationItem-root': {
                        borderRadius: '16px',
                        fontWeight: 900,
                        height: 50,
                        minWidth: 50,
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        transition: 'all 0.3s ease',
                        '&:hover': { transform: 'translateY(-3px)', boxShadow: theme.shadows[4] }
                      },
                      '& .Mui-selected': {
                        bgcolor: theme.palette.primary.main,
                        color: '#fff',
                        boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                        '&:hover': { bgcolor: theme.palette.primary.dark }
                      }
                    }}
                  />
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Container>

      {/* Filter Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { borderTopLeftRadius: 30, borderBottomLeftRadius: 30, overflow: 'hidden' } }}
      >
        <FilterPanel />
      </Drawer>
    </Box>
  );
}
