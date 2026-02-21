import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createProduct } from "../../redux/actions/productAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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
  Image as ImageIcon,
  Add as AddIcon,
  Delete as DeleteIcon
} from "@mui/icons-material";
import { IconButton, alpha } from "@mui/material";

const CreateProduct = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.newProducts);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageUrls, setImageUrls] = useState([""]); // Start with 1 empty string

  const { categories } = useSelector((state) => state.categories);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    
    setImages(prevImages => [...prevImages, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreviews(old => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

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
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stock", stock);

    images.forEach((image) => {
      formData.append("images", image);
    });

    const validUrls = imageUrls.filter(url => url.trim() !== "");
    if (validUrls.length > 0) {
      formData.append("imageUrls", JSON.stringify(validUrls));
    }
    
    dispatch(createProduct(formData));
    toast.success("Product Created Successfully!");
    setTimeout(() => {
      navigate('/admin/product');
      window.location.reload();
    }, 2000);
  };

  useEffect(() => {
    // If not loaded, dispatch from layout or here
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  return (
    <AdminLayout title="Create Product">
      <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 800, textAlign: 'center' }}>
            Add New Product
          </Typography>

          <form onSubmit={productSubmit}>
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
                  inputProps={{ minLength: 2, maxLength: 1000 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                        <DescriptionIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  startIcon={<ImageIcon />}
                  sx={{ py: 1.5, borderStyle: 'dashed' }}
                >
                  Upload Images
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleImageChange}
                    multiple
                    hidden
                  />
                </Button>
              </Grid>

              {/* Dynamic Image URLs */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700, color: 'text.secondary' }}>
                  Or Add Image URLs
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

              {imagePreviews.length > 0 && (
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', py: 1 }}>
                    {imagePreviews.map((img, idx) => (
                      <Box
                        key={idx}
                        component="img"
                        src={img}
                        alt="Preview"
                        sx={{
                          height: 100,
                          width: 100,
                          objectFit: 'cover',
                          borderRadius: 2,
                          boxShadow: theme.shadows[1]
                        }}
                      />
                    ))}
                  </Box>
                </Grid>
              )}

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading ? true : false}
                  sx={{ py: 1.5, fontWeight: 800, borderRadius: 2 }}
                >
                  Create Product
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default CreateProduct;
