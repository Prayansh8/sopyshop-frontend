import React from "react";
import { 
  Box, 
  Typography, 
  useTheme, 
  alpha 
} from "@mui/material";
import Metadata from "../../components/layout/Metadata";
import SearchContainer from "../../components/layout/SearchContainer";

const Search = () => {
  const theme = useTheme();

  return (
    <>
      <Metadata title="Search Products | Sopyshop" />
      <Box 
        sx={{ 
          flex: 1, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          p: 3,
          background: theme.palette.mode === 'light'
            ? `radial-gradient(circle at 10% 20%, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 40%), ${theme.palette.background.default}`
            : `radial-gradient(circle at 10% 20%, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 40%), ${theme.palette.background.default}` 
        }}
      >
        <Box 
          maxWidth="md" 
          sx={{ 
            mx: "auto", 
            width: "100%",
            bgcolor: alpha(theme.palette.background.paper, 0.7),
            backdropFilter: 'blur(10px)',
            p: { xs: 3, md: 6 },
            borderRadius: 6,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: theme.shadows[5]
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, color: "primary.main", textAlign: 'center', letterSpacing: '-0.02em' }}>
            Search Shop
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6, textAlign: 'center', fontWeight: 500 }}>
            Discover our collection of premium products and global fashion.
          </Typography>
          
          <SearchContainer autoFocus />
        </Box>
      </Box>
    </>
  );
};

export default Search;
