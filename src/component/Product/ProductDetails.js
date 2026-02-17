import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Button, 
  Rating, 
  Divider, 
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Paper,
  Chip,
  useTheme,
  alpha
} from "@mui/material";
import { Add, Remove, ShoppingCart, RateReview } from "@mui/icons-material";
import Loader from "../layout/Loader/Loader.js";
import ReviewsCard from "./ReviewsCard.js";
import { addItemToCart } from "../../actions/cartAction";
import MataData from "../layout/MataData";
import { toast } from "react-toastify";
import { NEW_REVIEW_RESET } from "../../constants/productConstant";

const ProductDetails = () => {
  const theme = useTheme();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [quantity, setQuantity] = useState(1);

  const submitReviewToggle = () => {
    setOpen(!open);
  };

  const handlePlusClick = () => {
    if (product.stock <= quantity) return;
    setQuantity(quantity + 1);
  };

  const handleMinusClick = () => {
    if (1 >= quantity) return;
    setQuantity(quantity - 1);
  };

  const addToCartHandler = () => {
    dispatch(addItemToCart(id, quantity));
    toast.success("Item added to cart");
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ bgcolor: "background.default", py: 6, minHeight: "100vh" }}>
          <MataData title={`${product?.name || 'Product'} | Sopyshop`} />
          <Container maxWidth="lg">
            <Grid container spacing={6}>
              {/* Product Images */}
              <Grid item xs={12} md={6}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    borderRadius: 4, 
                    bgcolor: "background.paper",
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                  }}
                >
                  <Carousel 
                    animation="slide" 
                    navButtonsAlwaysVisible 
                    indicators={product.images?.length > 1}
                    sx={{ height: { xs: 350, md: 500 } }}
                  >
                    {product.images &&
                      product.images.map((item, i) => (
                        <Box 
                          key={item._id} 
                          sx={{ 
                            height: { xs: 350, md: 500 }, 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center' 
                          }}
                        >
                          <img
                            src={item.url}
                            alt={`${i} Slide`}
                            style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "12px" }}
                          />
                        </Box>
                      ))}
                  </Carousel>
                </Paper>
              </Grid>

              {/* Product Info */}
              <Grid item xs={12} md={6}>
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                      {product.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Product ID: {product._id}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Rating 
                      value={product.ratings || 0} 
                      precision={0.5} 
                      readOnly 
                      sx={{ color: theme.palette.primary.main }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      ({product.numOfReviews} Reviews)
                    </Typography>
                  </Box>

                  <Divider />

                  <Typography variant="h3" color="primary" sx={{ fontWeight: 800 }}>
                    ₹{product.price?.toLocaleString("en-IN")}
                  </Typography>

                  <Stack direction="row" spacing={3} alignItems="center">
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        borderRadius: "8px",
                        p: 0.5
                      }}
                    >
                      <IconButton onClick={handleMinusClick} size="small" color="primary">
                        <Remove />
                      </IconButton>
                      <Typography sx={{ width: 40, textAlign: 'center', fontWeight: 700 }}>
                        {quantity}
                      </Typography>
                      <IconButton onClick={handlePlusClick} size="small" color="primary">
                        <Add />
                      </IconButton>
                    </Box>
                    <Button 
                      variant="contained" 
                      size="large" 
                      onClick={addToCartHandler}
                      disabled={product.stock < 1}
                      startIcon={<ShoppingCart />}
                      sx={{ px: 4, py: 1.5 }}
                    >
                      Add to Cart
                    </Button>
                  </Stack>

                  <Box>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Status:{" "}
                      <Chip 
                        label={product.stock < 1 ? "Out of Stock" : "In Stock"} 
                        color={product.stock < 1 ? "error" : "success"}
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                      Description
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineWeight: 1.7 }}>
                      {product.description}
                    </Typography>
                  </Box>

                  <Button 
                    variant="outlined" 
                    startIcon={<RateReview />} 
                    onClick={submitReviewToggle}
                    sx={{ alignSelf: 'flex-start' }}
                  >
                    Submit Review
                  </Button>
                </Stack>
              </Grid>
            </Grid>

            {/* Reviews Section */}
            <Box sx={{ mt: 10 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, textAlign: 'center' }}>
                Customer Reviews
              </Typography>
              
              {product.reviews && product.reviews[0] ? (
                <Grid container spacing={3}>
                  {product.reviews.map((review) => (
                    <Grid item xs={12} sm={6} md={4} key={review._id}>
                      <ReviewsCard review={review} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box sx={{ textAlign: 'center', py: 6, bgcolor: alpha(theme.palette.text.secondary, 0.05), borderRadius: 4 }}>
                  <Typography color="text.secondary">No reviews yet. Be the first to review!</Typography>
                </Box>
              )}
            </Box>
          </Container>

          {/* Review Dialog */}
          <Dialog open={open} onClose={submitReviewToggle} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 700 }}>Submit Your Review</DialogTitle>
            <DialogContent>
              <Stack spacing={3} sx={{ mt: 1 }}>
                <Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>Your Rating</Typography>
                  <Rating
                    onChange={(e, value) => setRating(value)}
                    value={rating}
                    size="large"
                    sx={{ color: theme.palette.primary.main }}
                  />
                </Box>
                <TextField
                  label="Share your thoughts..."
                  multiline
                  rows={4}
                  fullWidth
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  variant="outlined"
                />
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button onClick={submitReviewToggle} color="inherit">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} variant="contained">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Fragment>
  );
};

export default ProductDetails;
