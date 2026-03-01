import React from "react";
import { Link } from "react-router-dom";
import { 
  Box, 
  Typography, 
  Stack, 
  useTheme, 
  alpha 
} from "@mui/material";

const CartItemCard = ({ item, deleteCartItems }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
      <Box 
        sx={{ 
          width: { xs: 90, sm: 110 }, 
          height: { xs: 90, sm: 110 }, 
          flexShrink: 0,
          borderRadius: 4,
          overflow: 'hidden',
          border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}
      >
        <img 
          src={item.image} 
          alt={item.name} 
          style={{ width: "100%", height: "100%", objectFit: "cover" }} 
        />
      </Box>
      <Stack spacing={0.8} sx={{ overflow: 'hidden', flex: 1 }}>
        <Typography 
          variant="h6" 
          component={Link} 
          to={`/product/${item.product}`}
          sx={{ 
            fontWeight: 800, 
            textDecoration: "none", 
            color: theme.palette.text.primary,
            fontSize: { xs: '1rem', sm: '1.15rem' },
            lineHeight: 1.2,
            "&:hover": { color: theme.palette.primary.main },
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
          Category: <Box component="span" sx={{ color: 'text.primary' }}>{item.category || "General"}</Box>
        </Typography>
        <Typography variant="body2" color="primary" sx={{ fontWeight: 800, fontSize: '1rem' }}>
          ₹{item.price.toLocaleString("en-IN")}
        </Typography>
      </Stack>
    </Box>
  );
};

export default CartItemCard;
