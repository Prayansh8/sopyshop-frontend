import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  InputAdornment, 
  useTheme, 
  alpha 
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import MataData from "../layout/MataData";

export const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    navigate(keyword.trim() ? `/products/${keyword}` : "/products");
  };

  return (
    <>
      <MataData title="Search Products | Sopyshop" />
      <Box 
        sx={{ 
          minHeight: "80vh", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          background: theme.palette.mode === 'light'
            ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`
            : `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
        }}
      >
        <Container maxWidth="sm">
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 4, md: 6 }, 
              borderRadius: 6, 
              textAlign: 'center',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              bgcolor: "background.paper",
              boxShadow: theme.shadows[10]
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: "primary.main" }}>
              Search Shop
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 5 }}>
              Enter a product name or category to explore our collections
            </Typography>

            <Box component="form" onSubmit={searchSubmitHandler}>
              <TextField
                fullWidth
                placeholder="What are you looking for?"
                variant="outlined"
                onChange={(e) => setKeyword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" sx={{ fontSize: '1.8rem', mr: 1 }} />
                    </InputAdornment>
                  ),
                  sx: { 
                    borderRadius: 4, 
                    height: 65, 
                    fontSize: '1.1rem',
                    bgcolor: alpha(theme.palette.divider, 0.02)
                  }
                }}
              />
              <Button 
                type="submit" 
                variant="contained" 
                size="large" 
                fullWidth 
                sx={{ mt: 3, py: 2, borderRadius: 4, fontWeight: 700, fontSize: '1rem' }}
              >
                Search Now
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};
