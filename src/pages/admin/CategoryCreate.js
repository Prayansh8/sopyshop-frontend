import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createCategory } from "../../redux/actions/categoryAction";
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
  Category as CategoryIcon,
  Image as ImageIcon
} from "@mui/icons-material";
import { IconButton, alpha } from "@mui/material";

const CategoryCreate = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.newCategory);

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const categorySubmit = (e) => {
    e.preventDefault();
    
    // Pass as JSON to actions
    const categoryData = {
      name,
      imageUrl
    };
    
    dispatch(createCategory(categoryData));
    toast.success("Category Created Successfully!");
    setTimeout(() => {
      navigate('/admin/categories');
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
    <AdminLayout title="Create Category">
      <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 800, textAlign: 'center' }}>
            Add New Category
          </Typography>

          <form onSubmit={categorySubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Category Name"
                  variant="outlined"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  inputProps={{ minLength: 1, maxLength: 32 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CategoryIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Image URL (Optional)"
                  variant="outlined"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.png"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ImageIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
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
                  Create Category
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default CategoryCreate;
