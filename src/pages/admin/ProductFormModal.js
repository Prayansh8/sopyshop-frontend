import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  adminUpdateProduct,
  clearErrors,
  getProductDetails,
  getAdminProducts,
} from "../../redux/actions/productAction";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  InputAdornment,
  Grid,
  useTheme,
  IconButton,
  alpha
} from "@mui/material";
import {
  Edit as EditIcon,
  CurrencyRupee as CurrencyRupeeIcon,
  Category as CategoryIcon,
  Inventory as InventoryIcon,
  Description as DescriptionIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Close as CloseIcon
} from "@mui/icons-material";

const ProductFormModal = ({ open, handleClose, productId }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const isEditMode = !!productId;

  const { loading: createLoading, error: createError, success } = useSelector((state) => state.newProducts) || {};
  const { loading: updateLoading, error: updateError, isUpdated } = useSelector((state) => state.updateProduct) || {};
  const { product, error: detailsError } = useSelector((state) => state.productDetails) || {};

  const loading = isEditMode ? updateLoading : createLoading;
  const error = isEditMode ? updateError : createError;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrls, setImageUrls] = useState([""]); // Start with 1 empty string

  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    if (isEditMode) {
      if (product && product._id === productId) {
        setName(product.name || "");
        setDescription(product.description || "");
        setPrice(product.price || "");
        // Handle case where category is populated (object) or just a string
        // Initialize with ID instead of name
        setCategory(
          product.category && typeof product.category === 'object' 
            ? product.category._id 
            : product.category || ""
        );
        setStock(product.stock || "");
        if (product.images && product.images.length > 0) {
          setImageUrls(product.images.map((img) => img.url));
        } else {
          setImageUrls([""]);
        }
      } else {
        dispatch(getProductDetails(productId));
      }
    } else {
      // Reset form
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setStock("");
      setImageUrls([""]);
    }
  }, [dispatch, productId, isEditMode, product]);

  useEffect(() => {
    if (error) {
       // Support both string errors and object errors with message property
      toast.error(typeof error === 'string' ? error : error.message || "An error occurred");
      dispatch(clearErrors());
    }
    if (detailsError) {
      toast.error(typeof detailsError === 'string' ? detailsError : detailsError.message || "An error occurred");
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created Successfully!");
      dispatch({ type: "NEW_PRODUCTS_RESET" });
      dispatch(getAdminProducts());
      handleClose();
    }

    if (isUpdated) {
      toast.success("Product Updated Successfully!");
      dispatch({ type: "UPDATE_PRODUCTS_RESET" });
      dispatch(getAdminProducts());
      handleClose();
    }
  }, [error, detailsError, dispatch, success, isUpdated, handleClose]);

  const handleUrlChange = (index, value) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const addUrlField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const removeUrlField = (index) => {
    const newUrls = [...imageUrls];
    newUrls.splice(index, 1);
    setImageUrls(newUrls);
  };

  const productSubmit = (e) => {
    e.preventDefault();
    
    // We send a plain object because the update action expects application/json
    const productData = {
      name,
      description,
      price: Number(price),
      category, // This will now be the ID
      stock: Number(stock),
      imageUrls: imageUrls.filter((url) => url.trim() !== "")
    };

    if (isEditMode) {
      dispatch(adminUpdateProduct(productId, productData));
    } else {
      // Create product expects multipart/form-data currently in productAction.js
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category); // This will now be the ID
      formData.append("stock", stock);
      const validUrls = imageUrls.filter((url) => url.trim() !== "");
      if (validUrls.length > 0) {
        formData.append("imageUrls", JSON.stringify(validUrls));
      }
      dispatch(createProduct(formData));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, boxShadow: 24, margin: 2 } }}
    >
      <DialogTitle
        sx={{
          pt: 3,
          pb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 800, textAlign: "center" }}>
          {isEditMode ? `Update Product ${name && `- ${name}`}` : "Add New Product"}
        </Typography>
        <IconButton onClick={handleClose} sx={{ color: "text.secondary" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: { xs: 3, sm: 6 } }}>
        <form onSubmit={productSubmit}>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item size={6}>
              <TextField
                fullWidth
                label="Product Name"
                variant="outlined"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                inputProps={{ minLength: 1, maxLength: 32 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EditIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item size={6}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                variant="outlined"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                inputProps={{ maxLength: 6 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CurrencyRupeeIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item size={6}>
              <TextField
                fullWidth
                label="Stock"
                type="number"
                variant="outlined"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                inputProps={{ maxLength: 4 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <InventoryIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item size={6}>
              <TextField
                select
                fullWidth
                label="Category"
                variant="outlined"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CategoryIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="">Choose Category</MenuItem>
                {categories &&
                  categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>

            <Grid item size={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                inputProps={{ minLength: 2, maxLength: 1000 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1.5 }}>
                      <DescriptionIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Dynamic Image URLs */}
            <Grid item size={12}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700, color: "text.secondary" }}>
                Product Image URLs
              </Typography>
              {imageUrls.map((url, index) => (
                <Box key={index} sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <TextField
                    fullWidth
                    label={`Image Address Link ${index + 1}`}
                    variant="outlined"
                    value={url}
                    onChange={(e) => handleUrlChange(index, e.target.value)}
                    placeholder="https://example.com/image.png"
                  />
                  {imageUrls.length > 1 && (
                    <IconButton
                      color="error"
                      onClick={() => removeUrlField(index)}
                      sx={{ bgcolor: alpha(theme.palette.error.main, 0.1), borderRadius: 2 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
              <Button startIcon={<AddIcon />} onClick={addUrlField} sx={{ fontWeight: 700 }}>
                Add Another URL
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading ? true : false}
                sx={{ py: 1.5, fontWeight: 800, borderRadius: 2 }}
              >
                {isEditMode ? "Update Product" : "Create Product"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormModal;
