import React, { useState, useEffect, useRef } from "react";
import { 
  Box, 
  InputBase, 
  IconButton, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Avatar, 
  Typography, 
  Paper, 
  alpha,
  useTheme } from "@mui/material";
import { Search as SearchIcon, Close, History, TrendingUp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SearchContainer = ({ autoFocus = false, onResultClick = () => {} }) => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const theme = useTheme();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Get products and categories from Redux store
  const { allProducts } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const [categoryResults, setCategoryResults] = useState([]);

  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [autoFocus]);

  useEffect(() => {
    if (keyword.length > 0) {
      const lowerKeyword = keyword.toLowerCase();

      // 1. Filter Categories
      if (categories) {
        const filteredCats = categories.filter(cat => 
          cat.name.toLowerCase().includes(lowerKeyword)
        ).slice(0, 3);
        setCategoryResults(filteredCats);
      }

      // 2. Filter Products
      if (allProducts) {
        const filteredProducts = allProducts.filter((product) => {
          const nameMatch = product.name.toLowerCase().includes(lowerKeyword);
          const descMatch = product.description?.toLowerCase().includes(lowerKeyword);
          
          const productCat = categories?.find(c => c._id === product.category || c._id === product.category?._id);
          const catName = productCat?.name || (typeof product.category === 'string' ? product.category : "");
          const catMatch = catName.toLowerCase().includes(lowerKeyword);

          return nameMatch || descMatch || catMatch;
        }).slice(0, 6);
        setResults(filteredProducts);
      }
    } else {
      setResults([]);
      setCategoryResults([]);
    }
  }, [keyword, allProducts, categories]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
      onResultClick();
    }
  };

  const handleCategoryClick = (catName) => {
    navigate(`/products?category=${catName}`);
    onResultClick();
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
    onResultClick();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper 
        elevation={0}
        component="form"
        onSubmit={handleSearchSubmit}
        sx={{ 
          p: "10px 20px", 
          display: "flex", 
          alignItems: "center", 
          borderRadius: 4,
          border: `2px solid ${theme.palette.primary.main}`,
          bgcolor: alpha(theme.palette.background.paper, 0.8),
          boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.15)}`
        }}
      >
        <SearchIcon sx={{ color: "primary.main", mr: 1, fontSize: 32 }} />
        <InputBase
          inputRef={inputRef}
          fullWidth
          placeholder="What are you looking for today?"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          sx={{ 
            ml: 1, 
            flex: 1, 
            fontSize: { xs: "1.2rem", md: "1.8rem" }, 
            fontWeight: 600,
            color: theme.palette.text.primary
          }}
        />
        {keyword && (
          <IconButton onClick={() => setKeyword("")}>
            <Close />
          </IconButton>
        )}
      </Paper>

      <Box sx={{ mt: 4 }}>
        {(results.length > 0 || categoryResults.length > 0) ? (
          <Box>
            {categoryResults.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="overline" sx={{ fontWeight: 700, color: "text.secondary", ml: 1 }}>
                  Suggested Categories
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 1 }}>
                  {categoryResults.map((cat) => (
                    <Paper 
                      key={cat._id}
                      onClick={() => handleCategoryClick(cat.name)}
                      sx={{ 
                        px: 3, 
                        py: 1.5, 
                        borderRadius: 3, 
                        cursor: "pointer", 
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                        transition: "all 0.2s",
                        "&:hover": { 
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          transform: "translateY(-2px)",
                          boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.1)}`
                        }
                      }}
                    >
                      <Avatar src={cat.image} sx={{ width: 24, height: 24 }} />
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>{cat.name}</Typography>
                    </Paper>
                  ))}
                </Box>
              </Box>
            )}

            {results.length > 0 && (
              <Box>
                <Typography variant="overline" sx={{ fontWeight: 700, color: "text.secondary", ml: 1 }}>
                  Product Results
                </Typography>
                <List sx={{ mt: 1 }}>
                  {results.map((product) => (
                    <ListItem 
                      key={product._id} 
                      button 
                      onClick={() => handleProductClick(product._id)}
                      sx={{ 
                        borderRadius: 3, 
                        mb: 1, 
                        "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.08) } 
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar 
                          variant="rounded" 
                          src={product.images[0]?.url} 
                          sx={{ width: 60, height: 60, mr: 2 }} 
                        />
                      </ListItemAvatar>
                      <ListItemText 
                        primary={
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {product.name}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 0.5 }}>
                            <Typography variant="body2" color="primary" sx={{ fontWeight: 800 }}>
                              ₹{product.price}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {categories?.find(c => c._id === product.category || c._id === product.category?._id)?.name || "Product"}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
            
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography 
                variant="button" 
                component="div" 
                onClick={handleSearchSubmit}
                sx={{ color: "primary.main", cursor: "pointer", fontWeight: 700 }}
              >
                View all results for "{keyword}"
              </Typography>
            </Box>
          </Box>
        ) : keyword.length > 0 ? (
            <Box sx={{ textAlign: 'center', mt: 8 }}>
                <Typography variant="h5" color="text.secondary">
                    No products found for "{keyword}"
                </Typography>
            </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 6, mt: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <History sx={{ color: "text.secondary" }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Recent Searches</Typography>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {["Perfume", "Sofa", "Rice", "Beauty"].map((item) => (
                  <Paper 
                    key={item}
                    onClick={() => setKeyword(item)}
                    sx={{ 
                      px: 2, 
                      py: 1, 
                      borderRadius: 2, 
                      cursor: "pointer", 
                      bgcolor: alpha(theme.palette.divider, 0.05),
                      "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) }
                    }}
                  >
                    <Typography variant="body2">{item}</Typography>
                  </Paper>
                ))}
              </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <TrendingUp sx={{ color: "text.secondary" }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Trending Categories</Typography>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {["Fragrances", "Furniture", "Groceries", "Beauty"].map((item) => (
                  <Paper 
                    key={item}
                    onClick={() => setKeyword(item)}
                    sx={{ 
                      px: 2, 
                      py: 1, 
                      borderRadius: 2, 
                      cursor: "pointer", 
                      bgcolor: alpha(theme.palette.divider, 0.05),
                      "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) }
                    }}
                  >
                    <Typography variant="body2">{item}</Typography>
                  </Paper>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SearchContainer;
