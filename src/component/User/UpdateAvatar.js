import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateAvatarAction, clearErrors } from "../../actions/userAction";
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Button, 
  Stack, 
  Avatar, 
  CircularProgress,
  useTheme,
  alpha 
} from "@mui/material";
import { CloudUpload, Save } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import MataData from "../layout/MataData";

const UpdateAvatar = ({ user }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isUpdated, loading } = useSelector((state) => state.update || {});

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(user?.user?.avatar);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const updateAvatarSubmit = (e) => {
    e.preventDefault();
    if (!avatar) {
      toast.warn("Please select an image first");
      return;
    }
    const formData = new FormData();
    formData.append("avatar", avatar);
    dispatch(UpdateAvatarAction(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Avatar Updated Successfully");
      navigate("/account");
    }
  }, [dispatch, error, isUpdated, navigate]);

  return (
    <>
      <MataData title="Update Avatar | Sopyshop" />
      <Box sx={{ bgcolor: "background.default", py: 8, minHeight: "100vh" }}>
        <Container maxWidth="xs">
          <Paper 
            elevation={0}
            sx={{ 
              p: 4, 
              borderRadius: 4, 
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              bgcolor: "background.paper",
              textAlign: 'center'
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
              Update Avatar
            </Typography>

            <Box component="form" onSubmit={updateAvatarSubmit}>
              <Stack spacing={4} alignItems="center">
                <Avatar 
                  src={avatarPreview} 
                  sx={{ width: 180, height: 180, border: `4px solid ${theme.palette.primary.main}` }} 
                />
                
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUpload />}
                  sx={{ borderRadius: 2, px: 3 }}
                >
                  Choose New Photo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={loading}
                  startIcon={<Save />}
                  sx={{ py: 1.5, fontWeight: 700 }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Save Avatar"}
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default UpdateAvatar;
