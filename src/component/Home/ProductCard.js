import React from "react";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  Rating,
  alpha,
  useTheme,
  IconButton,
  Tooltip
} from "@mui/material";
import { AddShoppingCart, FavoriteBorder, Favorite } from "@mui/icons-material";
import { settingsConfig } from "../../settingsConfig";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../actions/cartAction";
import { toggleWishlist } from "../../actions/wishlistAction";
import { toast } from "react-toastify";

export default function ProductCard({ product }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  
  const { products: wishlistItems } = useSelector((state) => state.wishlist || { products: [] });
  const isWishlisted = wishlistItems.some(item => (item._id || item) === product._id);

  const addToCartHandler = () => {
    dispatch(addItemToCart(product._id, 1));
    toast.success("Item Added To Cart");
  };

  const addToWishlistHandler = () => {
    dispatch(toggleWishlist(product._id));
  };

  return (
    <Card 
      sx={{ 
        height: 460, 
        width: 275,
        mx: 'auto',
        display: "flex", 
        flexDirection: "column",
        position: "relative",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "&:hover": {
          transform: "translateY(-12px)",
          boxShadow: theme.palette.mode === 'light'
            ? "0 22px 40px rgba(0,0,0,0.08)"
            : "0 22px 40px rgba(0,0,0,0.4)",
          "& .action-buttons": {
            opacity: 1,
            transform: "translateX(0)"
          }
        },
        borderRadius: `${settingsConfig.layout.cardBorderRadius}px`,
        border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        bgcolor: "background.paper",
        overflow: "hidden"
      }}
    >
      {/* Product Image Section */}
      <Box sx={{ position: "relative", height: 250, overflow: 'hidden', bgcolor: alpha(theme.palette.divider, 0.05) }}>
        <Link to={`/product/${product._id}`} style={{ display: 'block', width: "100%", height: 250 }}>
          <CardMedia
            component="img"
            image={product.images[0]?.url}
            alt={product.name}
            sx={{
              width: '100%',
              height: 250,
              objectFit: "cover",
              transition: "transform 0.8s ease",
              "&:hover": {
                transform: "scale(1.1)"
              }
            }}
          />
        </Link>

        {/* Floating Action Buttons */}
        <Box 
          className="action-buttons"
          sx={{ 
            position: "absolute", 
            top: 12, 
            right: 12, 
            display: "flex", 
            flexDirection: "column", 
            gap: 1,
            opacity: isWishlisted ? 1 : 0,
            transform: isWishlisted ? "translateX(0)" : "translateX(20px)",
            transition: "all 0.3s ease-in-out"
          }}
        >
          <Tooltip title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"} placement="left">
            <IconButton 
              size="small" 
              onClick={addToWishlistHandler}
              sx={{ 
                bgcolor: isWishlisted ? theme.palette.primary.main : "background.paper", 
                color: isWishlisted ? "white" : "inherit",
                boxShadow: theme.shadows[2],
                "&:hover": { 
                  bgcolor: isWishlisted ? alpha(theme.palette.primary.main, 0.8) : theme.palette.primary.main, 
                  color: "white" 
                } 
              }}
            >
              {isWishlisted ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Quick Add" placement="left">
            <IconButton 
              size="small" 
              onClick={addToCartHandler}
              sx={{ 
                bgcolor: "background.paper", 
                boxShadow: theme.shadows[2],
                "&:hover": { bgcolor: theme.palette.primary.main, color: "white" } 
              }}
            >
              <AddShoppingCart fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Badge */}
        {product.Stock < 5 && product.Stock > 0 && (
          <Box 
            sx={{ 
              position: "absolute", 
              top: 12, 
              left: 12, 
              bgcolor: "error.main", 
              color: "white", 
              px: 1, 
              py: 0.5, 
              borderRadius: 1, 
              fontSize: "0.65rem", 
              fontWeight: 800, 
              textTransform: "uppercase" 
            }}
          >
            Low Stock
          </Box>
        )}
      </Box>

      {/* Content Section */}
      <CardContent sx={{ flexGrow: 1, p: 2, display: 'flex', flexDirection: 'column' }}>
        <Typography 
          variant="caption" 
          sx={{ 
            color: 'text.secondary', 
            textTransform: 'uppercase', 
            fontWeight: 700, 
            fontSize: '0.65rem', 
            letterSpacing: 1,
            mb: 0.5 
          }}
        >
          {product.category || "Luxury Essentials"}
        </Typography>
        
        <Link 
          to={`/product/${product._id}`} 
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 800,
              fontSize: "0.95rem",
              lineHeight: 1.4,
              height: "2.8rem", // Fixed height for 2 lines of text
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              mb: 1,
              transition: "color 0.3s ease",
              "&:hover": { color: "primary.main" }
            }}
          >
            {product.name}
          </Typography>
        </Link>
        
        <Box sx={{ display: "flex", alignItems: "center", mb: 2, mt: 'auto' }}>
          <Rating 
            value={product.ratings || 0} 
            precision={0.5} 
            readOnly 
            size="small" 
            sx={{ color: theme.palette.primary.main, fontSize: '0.875rem' }}
          />
          <Typography 
            variant="caption" 
            sx={{ ml: 0.5, color: theme.palette.text.secondary, fontWeight: 600 }}
          >
            ({product.numOfReviews})
          </Typography>
        </Box>
        
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 900, 
              color: "text.primary",
              fontSize: "1.1rem"
            }}
          >
            ₹{product.price?.toLocaleString("en-IN")}
          </Typography>
          {product.oldPrice && (
            <Typography 
              variant="caption" 
              sx={{ 
                textDecoration: "line-through", 
                color: "text.disabled",
                fontWeight: 600
              }}
            >
              ₹{product.oldPrice.toLocaleString("en-IN")}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
