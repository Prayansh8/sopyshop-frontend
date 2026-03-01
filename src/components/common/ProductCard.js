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
  Stack,
  Button,
  Tooltip
} from "@mui/material";
import {
  AddShoppingCart,
  FavoriteBorder,
  Favorite,
  Visibility,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../redux/actions/cartAction";
import { toggleWishlist } from "../../redux/actions/wishlistAction";
import { toast } from "react-toastify";

export default function ProductCard({ product, horizontal = false }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { products: wishlistItems } = useSelector(
    (state) => state.wishlist || { products: [] },
  );
  const { categories } = useSelector(
    (state) => state.categories || { categories: [] },
  );
  const { isAuthenticated } = useSelector((state) => state.loadUser);

  const isWishlisted = wishlistItems.some(
    (item) => (item._id || item) === product._id,
  );

  const categoryName =
    categories.find(
      (c) => c._id === (product.category?._id || product.category),
    )?.name ||
    (typeof product.category === "string"
      ? product.category
      : product.category?.name) ||
    "General";

  const addToCartHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItemToCart(product._id, 1));
    toast.success("Item Added To Cart");
  };

  const addToWishlistHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.warn("Please Login to add items to wishlist");
      return;
    }

    dispatch(toggleWishlist(product._id));
  };

  if (horizontal) {
    return (
      <Card
        sx={{
          display: "flex",
          width: "100%",
          mb: 2,
          position: "relative",
          overflow: "hidden",
          "&:hover .img-overlay": { opacity: 1 },
        }}
      >
        <Box sx={{ position: "relative", width: 220 }}>
          <Link to={`/product/${product._id}`}>
            <CardMedia
              component="img"
              sx={{ width: 220, height: "100%", objectFit: "cover" }}
              image={
                product.images && product.images[0]
                  ? product.images[0].url
                  : "https://via.placeholder.com/220"
              }
              alt={product.name}
            />
          </Link>
          <IconButton
            onClick={addToWishlistHandler}
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              bgcolor: "background.paper",
              "&:hover": { bgcolor: "background.default" },
            }}
            size="small"
          >
            {isWishlisted ? (
              <Favorite color="error" fontSize="small" />
            ) : (
              <FavoriteBorder fontSize="small" />
            )}
          </IconButton>
          <IconButton
            component={Link}
            to={`/product/${product._id}`}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "background.paper",
              "&:hover": { bgcolor: "background.default" },
              opacity: 0,
              transition: "0.3s",
              "&.MuiCard-root:hover &": { opacity: 1 },
            }}
            className="img-overlay"
            size="small"
          >
            <Visibility fontSize="small" />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1, p: 2 }}>
          <Typography
            variant="overline"
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            {categoryName}
          </Typography>
          <Tooltip title={product.name} placement="top" arrow>
            <Typography
              component="div"
              variant="h6"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {product.name?.length > 32 ? product.name.slice(0, 32) + "..." : product.name}
              </Link>
            </Typography>
          </Tooltip>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1, mb: 1 }}>
            <Rating
              value={product.ratings || 0}
              precision={0.5}
              readOnly
              size="small"
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.numOfReviews} reviews)
            </Typography>
          </Box>
          <Tooltip title={product.description} placement="bottom" arrow>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                mb: 2,
              }}
            >
              {product.description?.length > 100 ? product.description.slice(0, 100) + "..." : product.description}
            </Typography>
          </Tooltip>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mt="auto"
          >
            <Typography variant="h6" color="text.primary" fontWeight="bold">
              ₹{product.price?.toLocaleString()}
            </Typography>
            <Button
              size="small"
              variant="contained"
              startIcon={<AddShoppingCart />}
              onClick={addToCartHandler}
            >
              Add to Cart
            </Button>
          </Stack>
        </Box>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: `0 8px 24px ${alpha(theme.palette.common.black, 0.12)}`,
          "& .img-overlay": { opacity: 1 },
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          pt: "100%",
          overflow: "hidden",
          bgcolor: alpha(theme.palette.divider, 0.03),
        }}
      >
        <Link
          to={`/product/${product._id}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <CardMedia
            component="img"
            image={
              product.images && product.images[0]
                ? product.images[0].url
                : "https://via.placeholder.com/300"
            }
            alt={product.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Link>

        <Stack
          direction="column"
          spacing={1}
          sx={{ position: "absolute", top: 16, right: 16, zIndex: 3 }}
        >
          <IconButton
            onClick={addToWishlistHandler}
            sx={{
              bgcolor: isWishlisted
                ? "primary.main"
                : alpha(theme.palette.background.paper, 0.9),
              color: isWishlisted ? "#fff" : "inherit",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              backdropFilter: "blur(10px)",
              "&:hover": {
                bgcolor: isWishlisted ? "primary.dark" : "primary.main",
                color: "#fff",
              },
            }}
          >
            {isWishlisted ? (
              <Favorite fontSize="small" />
            ) : (
              <FavoriteBorder fontSize="small" />
            )}
          </IconButton>
        </Stack>

        <Box
          className="img-overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: alpha(theme.palette.common.black, 0.2),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            transition: "0.4s ease",
            pointerEvents: "none",
          }}
        >
          <Button
            component={Link}
            to={`/product/${product._id}`}
            variant="contained"
            size="small"
            startIcon={<Visibility />}
            sx={{
              bgcolor: "#fff",
              color: "#000",
              fontWeight: 900,
              borderRadius: 2,
              px: 2.5,
              "&:hover": { bgcolor: alpha("#fff", 0.9) },
              pointerEvents: "auto",
            }}
          >
            Quick View
          </Button>
        </Box>
      </Box>

      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 2 }}
      >
        <Typography
          variant="overline"
          color="primary"
          sx={{
            fontWeight: "bold",
            display: "block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            lineHeight: 1.2,
            mb: 0.5,
          }}
        >
          {categoryName}
        </Typography>

        <Tooltip title={product.name} placement="top" arrow>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              fontWeight: 800,
              lineHeight: 1.3,
              mb: 1,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              height: "2.6em", // Ensures consistent height
            }}
          >
            <Link
              to={`/product/${product._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {product.name?.length > 32 ? product.name.slice(0, 32) + "..." : product.name}
            </Link>
          </Typography>
        </Tooltip>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Rating
            value={product.ratings || 0}
            precision={0.5}
            readOnly
            size="small"
          />
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
            ({product.numOfReviews})
          </Typography>
        </Box>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: "auto" }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 900, color: "text.primary" }}
          >
            ₹{product.price?.toLocaleString()}
          </Typography>

          <IconButton
            onClick={addToCartHandler}
            sx={{
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: "primary.main",
              borderRadius: 3,
              p: 1.5,
              transition: "0.3s",
              "&:hover": {
                bgcolor: "primary.main",
                color: "#fff",
                transform: "scale(1.1)",
              },
            }}
          >
            <AddShoppingCart sx={{ fontSize: "1.4rem" }} />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
