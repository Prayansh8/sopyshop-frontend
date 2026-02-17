import React from "react";
import { Link } from "react-router-dom";
import { 
  Box, 
  Typography, 
  IconButton, 
  Stack, 
  useTheme, 
  alpha 
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";

const CartItemCard = ({ item, deleteCartItems }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      <Box 
        sx={{ 
          width: { xs: 80, sm: 100 }, 
          height: { xs: 80, sm: 100 }, 
          flexShrink: 0,
          borderRadius: 2,
          overflow: 'hidden',
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
        }}
      >
        <img 
          src={item.image} 
          alt={item.name} 
          style={{ width: "100%", height: "100%", objectFit: "cover" }} 
        />
      </Box>
      <Stack spacing={0.5} sx={{ overflow: 'hidden' }}>
        <Typography 
          variant="subtitle1" 
          component={Link} 
          to={`/product/${item.product}`}
          sx={{ 
            fontWeight: 700, 
            textDecoration: "none", 
            color: theme.palette.text.primary,
            "&:hover": { color: theme.palette.primary.main },
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: <b>₹{item.price.toLocaleString("en-IN")}</b>
        </Typography>
        <Typography 
          variant="caption" 
          onClick={() => deleteCartItems(item.product)}
          sx={{ 
            color: theme.palette.error.main, 
            cursor: "pointer", 
            width: "fit-content",
            fontWeight: 600,
            display: { xs: 'none', sm: 'block' },
            "&:hover": { textDecoration: 'underline' }
          }}
        >
          Remove Item
        </Typography>
      </Stack>
    </Box>
  );
};

export default CartItemCard;
