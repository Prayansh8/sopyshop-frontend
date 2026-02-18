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
  Tooltip,
  Stack,
  Button
} from "@mui/material";
import { AddShoppingCart, FavoriteBorder, Favorite, Visibility } from "@mui/icons-material";
import { settingsConfig } from "../../settingsConfig";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../actions/cartAction";
import { toggleWishlist } from "../../actions/wishlistAction";
import { toast } from "react-toastify";

export default function ProductCard({ product, horizontal = false }) {
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

  if (horizontal) {
    return (
      <Card 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          borderRadius: 6,
          overflow: 'hidden',
          border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
            transform: 'translateY(-4px)'
          }
        }}
      >
        <Box sx={{ width: { xs: '100%', sm: 300 }, position: 'relative' }}>
            <Link to={`/product/${product._id}`}>
                <CardMedia
                    component="img"
                    image={product.images[0]?.url}
                    alt={product.name}
                    sx={{ height: 250, objectFit: 'cover' }}
                />
            </Link>
            <IconButton 
              onClick={addToWishlistHandler}
              sx={{ 
                position: 'absolute', top: 10, left: 10, 
                bgcolor: isWishlisted ? 'primary.main' : alpha('#000', 0.2),
                color: '#fff',
                '&:hover': { bgcolor: isWishlisted ? 'primary.dark' : alpha('#000', 0.4) }
              }}
            >
              {isWishlisted ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
            </IconButton>
        </Box>
        <CardContent sx={{ flexGrow: 1, p: 4, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 900, textTransform: 'uppercase', mb: 1 }}>
                {product.category}
            </Typography>
            <Typography variant="h4" component={Link} to={`/product/${product._id}`} sx={{ fontWeight: 900, textDecoration: 'none', color: 'inherit', mb: 2 }}>
                {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, opacity: 0.8, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {product.description}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 'auto' }}>
                <Rating value={product.ratings} readOnly size="small" precision={0.5} />
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.disabled' }}>({product.numOfReviews} Reviews)</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>₹{product.price?.toLocaleString()}</Typography>
                <Stack direction="row" spacing={1}>
                    <Button 
                        variant="contained" 
                        startIcon={<AddShoppingCart />} 
                        onClick={addToCartHandler}
                        sx={{ borderRadius: 3, px: 3, py: 1.5, fontWeight: 800 }}
                    >
                        Add to Cart
                    </Button>
                    <IconButton component={Link} to={`/product/${product._id}`} sx={{ bgcolor: alpha(theme.palette.divider, 0.05), borderRadius: 3 }}>
                        <Visibility />
                    </IconButton>
                </Stack>
            </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: "flex", 
        flexDirection: "column",
        position: "relative",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "&:hover": {
          transform: "translateY(-12px)",
          boxShadow: theme.palette.mode === 'light'
            ? "0 30px 60px rgba(0,0,0,0.1)"
            : "0 30px 60px rgba(0,0,0,0.4)",
          "& .action-buttons": {
            opacity: 1,
            transform: "translateX(0)"
          }
        },
        borderRadius: 6,
        border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        bgcolor: "background.paper",
        overflow: "hidden"
      }}
    >
      <Box sx={{ position: "relative", height: 280, overflow: 'hidden', bgcolor: alpha(theme.palette.divider, 0.02) }}>
        <Link to={`/product/${product._id}`} style={{ display: 'block', width: "100%", height: '100%' }}>
          <CardMedia
            component="img"
            image={product.images[0]?.url}
            alt={product.name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: "cover",
              transition: "transform 1s cubic-bezier(0,0,0.1,1)",
              "&:hover": { transform: "scale(1.15)" }
            }}
          />
        </Link>

        {/* Action Overlay */}
        <Box 
          className="action-buttons"
          sx={{ 
            position: "absolute", 
            top: 15, 
            right: 15, 
            display: "flex", 
            flexDirection: "column", 
            gap: 1.5,
            opacity: isWishlisted ? 1 : 0,
            transform: isWishlisted ? "translateX(0)" : "translateX(20px)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          <Tooltip title={isWishlisted ? "Remove Wishlist" : "Wishlist"} placement="left">
            <IconButton 
              onClick={addToWishlistHandler}
              sx={{ 
                bgcolor: isWishlisted ? 'primary.main' : 'background.paper', 
                color: isWishlisted ? '#fff' : 'inherit',
                boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                '&:hover': { bgcolor: isWishlisted ? 'primary.dark' : 'primary.main', color: '#fff' }
              }}
            >
              {isWishlisted ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
            </IconButton>
          </Tooltip>
          <Tooltip title="View Details" placement="left">
            <IconButton 
              component={Link} 
              to={`/product/${product._id}`}
              sx={{ 
                bgcolor: 'background.paper', 
                boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                '&:hover': { bgcolor: 'primary.main', color: '#fff' }
              }}
            >
              <Visibility fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Stock Badge */}
        {product.stock < 10 && product.stock > 0 && (
          <Box 
            sx={{ 
              position: "absolute", bottom: 15, left: 15, 
              bgcolor: 'error.main', color: '#fff', 
              px: 1.5, py: 0.5, borderRadius: 2, 
              fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase',
              boxShadow: '0 4px 12px rgba(211, 47, 47, 0.4)'
            }}
          >
            Only {product.stock} Left
          </Box>
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, mb: 1 }}>
          {product.category}
        </Typography>
        
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 900, fontSize: "1.1rem", lineHeight: 1.3, mb: 2,
              height: '2.6rem', overflow: 'hidden', display: '-webkit-box',
              WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
              '&:hover': { color: 'primary.main' }
            }}
          >
            {product.name}
          </Typography>
        </Link>
        
        <Box sx={{ display: "flex", alignItems: "center", mb: 3, mt: 'auto' }}>
          <Rating value={product.ratings || 0} precision={0.5} readOnly size="small" sx={{ color: 'primary.main' }} />
          <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary', fontWeight: 700 }}>
            ({product.numOfReviews})
          </Typography>
        </Box>
        
        <Stack direction="row" alignItems="center" justifyContent="space-between">
           <Typography variant="h5" sx={{ fontWeight: 900 }}>
             ₹{product.price?.toLocaleString()}
           </Typography>
           <Button 
             variant="contained" 
             onClick={addToCartHandler}
             sx={{ 
               minWidth: 48, width: 48, height: 48, borderRadius: 3, p: 0,
               boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.2)}` 
             }}
           >
             <AddShoppingCart fontSize="small" />
           </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
