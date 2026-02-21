import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  adminUpdateProduct,
  clearErrors,
  getProductDetails,
} from "../../redux/actions/productAction";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  TextField, 
  MenuItem,
  InputAdornment,
  Grid,
  useTheme
} from "@mui/material";
import {
  Edit as EditIcon,
  CurrencyRupee as CurrencyRupeeIcon,
  Category as CategoryIcon,
  Inventory as InventoryIcon,
  Description as DescriptionIcon,
  Add as AddIcon,
  Delete as DeleteIcon
} from "@mui/icons-material";
import { IconButton, alpha } from "@mui/material";

const UpdateProduct = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.updateProduct);
  const { product } = useSelector((state) => state.productDetails);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrls, setImageUrls] = useState([""]); 

  const { categories } = useSelector((state) => state.categories);

  const updateProductSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stock", stock);

    const validUrls = imageUrls.filter(url => url.trim() !== "");
    if (validUrls.length > 0) {
      formData.append("imageUrls", JSON.stringify(validUrls));
    }

    dispatch(adminUpdateProduct(id, formData));
    toast.success("Product Updated Successfully!");
    setTimeout(() => {
      navigate('/admin/product');
    }, 2000);
  };

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name || "");
      setDescription(product.description || "");
      setPrice(product.price || "");
      setCategory(product.category || "");
      setStock(product.stock || "");
      if (product.images && product.images.length > 0) {
        setImageUrls(product.images.map(img => img.url));
      } else {
        setImageUrls([""]);
      }
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, product, id]);

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

  return (
    <AdminLayout title="Update Product">
      <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 800, textAlign: 'center' }}>
            Update Product {name && `- ${name}`}
          </Typography>

          <form onSubmit={updateProductSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
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

              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12}>
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
                  {categories && categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat.name}>{cat.name}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  variant="outlined"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  inputProps={{ minLength: 4, maxLength: 500 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                        <DescriptionIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Dynamic Image URLs */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700, color: 'text.secondary' }}>
                  Product Image URLs
                </Typography>
                {imageUrls.map((url, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 1, mb: 2 }}>
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
                <Button
                  startIcon={<AddIcon />}
                  onClick={addUrlField}
                  sx={{ fontWeight: 700 }}
                >
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
                  Update Product
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default UpdateProduct;
