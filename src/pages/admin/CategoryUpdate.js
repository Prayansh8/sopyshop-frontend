import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCategory,
  clearErrors,
} from "../../redux/actions/categoryAction";
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
  Category as CategoryIcon,
  Image as ImageIcon
} from "@mui/icons-material";
import { IconButton, alpha } from "@mui/material";

const CategoryUpdate = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, error, isUpdated } = useSelector((state) => state.categoryOperation);
  const { categories } = useSelector((state) => state.categories);

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const selectedCategory = categories?.find(cat => cat._id === id);

  const categorySubmit = (e) => {
    e.preventDefault();

    const categoryData = {
      name,
      imageUrl
    };

    dispatch(updateCategory(id, categoryData));
    toast.success("Category Updated Successfully!");
    setTimeout(() => {
      navigate('/admin/categories');
    }, 2000);
  };

  useEffect(() => {
    if (selectedCategory) {
      setName(selectedCategory.name || "");
      setImageUrl(selectedCategory.image?.url || "");
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, selectedCategory, id]);

  return (
    <AdminLayout title="Update Category">
      <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 800, textAlign: 'center' }}>
            Update Category {name && `- ${name}`}
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
                  Update Category
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default CategoryUpdate;
