import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../redux/actions/productAction";
import ProductCard from "../../components/common/ProductCard";
import {
  ProductGridSkeleton,
  ProductCardSkeleton,
} from "../../components/common/ProductSkeleton";
import Metadata from "../../components/layout/Metadata";
import { useParams, useSearchParams } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Pagination,
  Button,
  useTheme,
  alpha,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Chip,
  Radio,
  RadioGroup,
  FormControlLabel,
  Avatar,
} from "@mui/material";
import {
  Tune,
  Category,
  LocalOffer,
  Clear,
  Opacity,
  HomeOutlined,
  GridView,
  ViewStream,
} from "@mui/icons-material";
import { toast } from "react-toastify";

const categoryIconMap = {
  beauty: <Opacity fontSize="small" />,
  fragrances: <Tune fontSize="small" />,
  furniture: <HomeOutlined fontSize="small" />,
  groceries: <LocalOffer fontSize="small" />,
};

const priceRanges = [
  { label: "All Prices", value: [0, 1000000] },
  { label: "Under ₹500", value: [0, 500] },
  { label: "₹500 - ₹2,000", value: [500, 2000] },
  { label: "₹2,000 - ₹5,000", value: [2000, 5000] },
  { label: "₹5,000 - ₹10,000", value: [5000, 10000] },
  { label: "Over ₹10,000", value: [10000, 1000000] },
];

const sortOptions = [
  { label: "Newest Arrivals", value: "-createdAt" },
  { label: "Price: Low to High", value: "price" },
  { label: "Price: High to Low", value: "-price" },
  { label: "Top Rated", value: "-ratings" },
  { label: "Alphabetical (A-Z)", value: "name" },
];

export default function Products() {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { keyword: keywordParam } = useParams();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [price, setPrice] = useState([0, 1000000]);
  const [category, setCategory] = useState(categoryParam || "");
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("-createdAt");
  const [viewMode, setViewMode] = useState("grid");
  const [itemsPerRow, setItemsPerRow] = useState(3); // Default to 3 items as requested
  const itemsPerPage = itemsPerRow * 4; // Adjust items per page based on layout

  const dispatch = useDispatch();
  const { allProducts, loading, error } = useSelector(
    (state) => state.products,
  );

  const { categories } = useSelector((state) => state.categories);

  // Products and Categories are now pre-fetched in App.js

  useEffect(() => {
    if (categoryParam) {
      setCategory(categoryParam);
      setCurrentPage(1);
    }
  }, [categoryParam]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const handlePriceChange = (event) => {
    const selectedRange = priceRanges.find(
      (range) => range.label === event.target.value,
    );
    if (selectedRange) {
      setPrice(selectedRange.value);
      setCurrentPage(1);
    }
  };

  const handleCategoryClick = (cat) => {
    setCategory(cat === category ? "" : cat);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setPrice([0, 1000000]);
    setCategory("");
    setSort("-createdAt");
    setCurrentPage(1);
  };

  // Frontend Side Filtering and Sorting
  const filteredProducts = useMemo(() => {
    if (!allProducts) return [];

    let result = [...allProducts];

    // Filter by Keyword
    if (keywordParam) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(keywordParam.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(keywordParam.toLowerCase()),
      );
    }

    // Filter by Category
    if (category) {
      result = result.filter((product) => {
        const categoryId = product.category?._id || product.category;
        const productCategory =
          categories.find((cat) => cat._id === categoryId)?.name ||
          product.category?.name ||
          (typeof product.category === 'string' ? product.category : "");
          
        return productCategory && productCategory.toLowerCase() === category.toLowerCase();
      });
    }

    // Filter by Price
    result = result.filter(
      (product) => product.price >= price[0] && product.price <= price[1],
    );

    // Sorting
    result.sort((a, b) => {
      switch (sort) {
        case "price":
          return a.price - b.price;
        case "-price":
          return b.price - a.price;
        case "-ratings":
          return b.ratings - a.ratings;
        case "name":
          return a.name.localeCompare(b.name);
        case "-createdAt":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return result;
  }, [allProducts, keywordParam, category, price, sort, categories]);

  // Frontend Pagination
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const FilterPanel = () => (
    <Box sx={{ p: 4, width: { xs: "100vw", sm: 400 } }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 1 }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 900, letterSpacing: "-0.02em" }}
        >
          Filters
        </Typography>
        <IconButton
          onClick={() => setDrawerOpen(false)}
          sx={{ bgcolor: alpha(theme.palette.divider, 0.05) }}
        >
          <Clear fontSize="small" />
        </IconButton>
      </Stack>

      <Box sx={{ mb: 1 }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 800,
            color: "text.secondary",
            mb: 1,
            textTransform: "uppercase",
            letterSpacing: 1.5,
          }}
        >
          Price Range
        </Typography>
        <Box sx={{ px: 1 }}>
          <RadioGroup
            value={
              priceRanges.find(
                (r) => r.value[0] === price[0] && r.value[1] === price[1],
              )?.label || "All Prices"
            }
            onChange={handlePriceChange}
          >
            {priceRanges.map((range) => (
              <FormControlLabel
                key={range.label}
                value={range.label}
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: alpha(theme.palette.primary.main, 0.2),
                      "&.Mui-checked": { color: theme.palette.primary.main },
                    }}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: "text.primary" }}
                  >
                    {range.label}
                  </Typography>
                }
                sx={{
                  mb: 1,
                  mx: 0,
                  width: "100%",
                  borderRadius: 2,
                  transition: "0.2s",
                  "&:hover": {
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                  },
                  ...(priceRanges.find(
                    (r) => r.value[0] === price[0] && r.value[1] === price[1],
                  )?.label === range.label && {
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                  }),
                }}
              />
            ))}
          </RadioGroup>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 800,
            color: "text.secondary",
            mb: 1,
            textTransform: "uppercase",
            letterSpacing: 1.5,
          }}
        >
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
                justifyContent: "flex-start",
                borderRadius: 2,
                py: 1.5,
                px: 2,
                fontWeight: sort === opt.value ? 800 : 600,
                textTransform: "none",
              }}
            >
              {opt.label}
            </Button>
          ))}
        </Stack>
      </Box>

      <Box sx={{ mt: 1 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={clearFilters}
          sx={{
            borderRadius: 3,
            py: 2,
            fontWeight: 800,
            border: `2px solid ${theme.palette.divider}`,
          }}
        >
          Reset All Filters
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Metadata title={"Sopyshop | Collections"} />

      {/* Sticky Horizontal Control Bar */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          bgcolor: alpha(theme.palette.background.paper, 0.85),
          backdropFilter: "blur(20px)",
          py: 2,
          px: 2,
        }}
      >
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            {/* Filter Trigger */}
            <Button
              startIcon={<Tune fontSize="small" />}
              onClick={() => setDrawerOpen(true)}
              sx={{
                borderRadius: 2.5,
                px: 3,
                py: 1,
                fontWeight: 800,
                textTransform: "none",
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) },
              }}
            >
              Filter & Sort
            </Button>

            {/* Scrollable Categories Chips */}
            <Box
              sx={{
                flexGrow: 1,
                overflowX: "auto",
                display: { xs: "none", md: "flex" },
                gap: 1.5,
                px: 4,
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
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
                  bgcolor: category === "" ? "primary.main" : "transparent",
                  color: category === "" ? "#fff" : "text.primary",
                  border: `1px solid ${category === "" ? "primary.main" : alpha(theme.palette.divider, 0.2)}`,
                  "&:hover": {
                    bgcolor:
                      category === ""
                        ? "primary.dark"
                        : alpha(theme.palette.divider, 0.1),
                  },
                }}
              />
              {categories &&
                categories.map((cat) => {
                  const icon = categoryIconMap[cat.name] || (
                    <Category fontSize="small" />
                  );
                  const imageUrl = cat.image?.url;

                  return (
                    <Chip
                      key={cat._id}
                      icon={
                        !imageUrl
                          ? React.cloneElement(icon, {
                              style: {
                                color:
                                  category === cat.name ? "#fff" : "inherit",
                              },
                            })
                          : undefined
                      }
                      avatar={
                        imageUrl ? (
                          <Avatar
                            src={imageUrl}
                            sx={{ width: 24, height: 24 }}
                          />
                        ) : undefined
                      }
                      label={
                        cat.name.charAt(0).toUpperCase() + cat.name.slice(1)
                      }
                      onClick={() => handleCategoryClick(cat.name)}
                      sx={{
                        borderRadius: 2.5,
                        fontWeight: 700,
                        px: 1.5,
                        py: 2.5,
                        bgcolor:
                          category === cat.name
                            ? "primary.main"
                            : "transparent",
                        color: category === cat.name ? "#fff" : "text.primary",
                        border: `1px solid ${category === cat.name ? "primary.main" : alpha(theme.palette.divider, 0.2)}`,
                        transition: "0.3s",
                        "&:hover": {
                          bgcolor:
                            category === cat.name
                              ? "primary.dark"
                              : alpha(theme.palette.divider, 0.1),
                        },
                      }}
                    />
                  );
                })}
            </Box>

            {/* Results Count & View Toggle */}
            <Stack direction="row" alignItems="center" spacing={3}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color: "text.secondary",
                  whiteSpace: "nowrap",
                }}
              >
                <Box component="span" sx={{ color: "text.primary" }}>
                  {filteredProducts.length}
                </Box>{" "}
                Items
              </Typography>

              <Divider
                orientation="vertical"
                flexItem
                sx={{ height: 20, my: "auto" }}
              />

              {viewMode === "grid" && (
                <Stack
                  direction="row"
                  spacing={0.5}
                  sx={{ display: { xs: "none", lg: "flex" } }}
                >
                  {[2, 3, 4, 6].map((num) => (
                    <Button
                      key={num}
                      onClick={() => setItemsPerRow(num)}
                      sx={{
                        minWidth: 35,
                        h: 35,
                        p: 0,
                        borderRadius: 1.5,
                        fontWeight: 900,
                        fontSize: "0.75rem",
                        bgcolor:
                          itemsPerRow === num ? "primary.main" : "transparent",
                        color: itemsPerRow === num ? "#fff" : "text.secondary",
                        border: `1px solid ${itemsPerRow === num ? "primary.main" : alpha(theme.palette.divider, 0.1)}`,
                        "&:hover": {
                          bgcolor:
                            itemsPerRow === num
                              ? "primary.dark"
                              : alpha(theme.palette.divider, 0.2),
                        },
                      }}
                    >
                      {num}x
                    </Button>
                  ))}
                </Stack>
              )}

              <Stack direction="row" spacing={0.5}>
                <IconButton
                  size="small"
                  onClick={() => setViewMode("grid")}
                  sx={{
                    color:
                      viewMode === "grid" ? "primary.main" : "text.disabled",
                    bgcolor:
                      viewMode === "grid"
                        ? alpha(theme.palette.primary.main, 0.05)
                        : "transparent",
                  }}
                >
                  <GridView fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => setViewMode("list")}
                  sx={{
                    color:
                      viewMode === "list" ? "primary.main" : "text.disabled",
                    bgcolor:
                      viewMode === "list"
                        ? alpha(theme.palette.primary.main, 0.05)
                        : "transparent",
                  }}
                >
                  <ViewStream fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box maxWidth="lg" sx={{ py: 3, mx: "auto" }}>
        <Box>
          {/* Active Chips Row */}
          {(category ||
            price[0] !== 0 ||
            price[1] !== 1000000 ||
            keywordParam) && (
            <Box sx={{ mb: 1, display: "flex", flexWrap: "wrap", gap: 1.5 }}>
              {keywordParam && (
                <Chip
                  label={`Search: ${keywordParam}`}
                  onDelete={() => (window.location.href = "/products")}
                  sx={{ borderRadius: 2, fontWeight: 700 }}
                />
              )}
              {category && (
                <Chip
                  label={`Category: ${category}`}
                  onDelete={() => setCategory("")}
                  sx={{ borderRadius: 2, fontWeight: 700 }}
                />
              )}
              {(price[0] !== 0 || price[1] !== 1000000) && (
                <Chip
                  label={`Price: ${priceRanges.find((r) => r.value[0] === price[0] && r.value[1] === price[1])?.label || "Custom"}`}
                  onDelete={() => setPrice([0, 1000000])}
                  sx={{ borderRadius: 2, fontWeight: 700 }}
                />
              )}
              <Button
                size="small"
                onClick={clearFilters}
                sx={{ fontWeight: 800, textTransform: "none" }}
              >
                Clear All
              </Button>
            </Box>
          )}

          {loading ? (
            <Box>
              {viewMode === "grid" ? (
                <ProductGridSkeleton
                  count={itemsPerPage}
                  md={12 / itemsPerRow}
                  lg={12 / itemsPerRow}
                />
              ) : (
                <Stack spacing={2}>
                  {[...Array(6)].map((_, i) => (
                    <ProductCardSkeleton key={i} horizontal />
                  ))}
                </Stack>
              )}
            </Box>
          ) : !paginatedProducts || paginatedProducts.length === 0 ? (
            <Box sx={{ py: 15, textAlign: "center" }}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: "50%",
                  bgcolor: alpha(theme.palette.error.main, 0.05),
                  display: "inline-flex",
                  mb: 4,
                }}
              >
                <Tune
                  sx={{ fontSize: 80, color: "error.light", opacity: 0.5 }}
                />
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 900, mb: 2 }}>
                No Matches Found
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  maxWidth: 500,
                  mx: "auto",
                  mb: 5,
                }}
              >
                We couldn't find any products matching your specific selection.
                Try broadening your filters or clearing them all.
              </Typography>
              <Button
                variant="contained"
                onClick={clearFilters}
                sx={{ borderRadius: 4, px: 6, py: 2, fontWeight: 800 }}
              >
                Back to All Products
              </Button>
            </Box>
          ) : (
            <Box>
              <Grid container spacing={2}>
                {paginatedProducts.map((item) => (
                  <Grid
                    item
                    key={item._id}
                    size={
                      viewMode === "grid"
                        ? {
                            xs: 12 / itemsPerRow,
                            md: 12 / itemsPerRow,
                            lg: 12 / itemsPerRow,
                          }
                        : { xs: 12, md: 12, lg: 12 }
                    }
                    xs={viewMode === "grid" ? 12 / itemsPerRow : 12}
                    md={viewMode === "grid" ? 12 / itemsPerRow : 12}
                    lg={viewMode === "grid" ? 12 / itemsPerRow : 12}
                  >
                    <ProductCard
                      product={item}
                      horizontal={viewMode === "list"}
                    />
                  </Grid>
                ))}
              </Grid>

              {totalPages > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 15 }}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(e, v) => setCurrentPage(v)}
                    color="primary"
                    size="large"
                    sx={{
                      "& .MuiPaginationItem-root": {
                        borderRadius: "16px",
                        fontWeight: 900,
                        height: 50,
                        minWidth: 50,
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-3px)",
                          boxShadow: theme.shadows[4],
                        },
                      },
                      "& .Mui-selected": {
                        bgcolor: theme.palette.primary.main,
                        color: "#fff",
                        boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                        "&:hover": { bgcolor: theme.palette.primary.dark },
                      },
                    }}
                  />
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>

      {/* Filter Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 30,
            borderBottomLeftRadius: 30,
            overflow: "hidden",
          },
        }}
      >
        <FilterPanel />
      </Drawer>
    </Box>
  );
}
