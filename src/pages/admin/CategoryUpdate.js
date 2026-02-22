import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCategory,
  clearErrors,
  getCategories,
} from "../../redux/actions/categoryAction";
import { toast } from "react-toastify";
import { IconButton, 
  Button, 
  Typography, 
  Dialog,
  DialogTitle,
  DialogContent,
  TextField, 
  InputAdornment,
  Grid
} from "@mui/material";
import {
  Category as CategoryIcon,
  Image as ImageIcon
, Close as CloseIcon
} from "@mui/icons-material";
const CategoryUpdate = ({ open, handleClose, categoryId }) => {
  const dispatch = useDispatch();
  const id = categoryId;
  
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
  };

  useEffect(() => {
    if (selectedCategory) {
      setName(selectedCategory.name || "");
      setImageUrl(selectedCategory.image?.url || (typeof selectedCategory.image === 'string' ? selectedCategory.image : ""));
    }

    if (error) {
       // Support both string errors and object errors with message property
      toast.error(typeof error === 'string' ? error : error.message || "An error occurred");
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Category Updated Successfully!");
      dispatch({ type: "UPDATE_CATEGORY_RESET" });
      dispatch(getCategories());
      handleClose();
    }
  }, [error, dispatch, selectedCategory, id, isUpdated, handleClose]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3, boxShadow: 24, margin: 2 } }}>
      <DialogTitle sx={{ pt: 3, pb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: 800, textAlign: 'center' }}>
          Update Category {name && `- ${name}`}
        </Typography>
        <IconButton onClick={handleClose} sx={{ color: "text.secondary" }}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: { xs: 2, sm: 4 } }}>

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
      </DialogContent>
    </Dialog>
  );
};

export default CategoryUpdate;
