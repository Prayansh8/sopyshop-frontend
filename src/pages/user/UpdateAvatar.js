import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateAvatarAction, clearErrors } from "../../redux/actions/userAction";
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Stack, 
  Avatar, 
  CircularProgress,
  useTheme,
  alpha,
  Container,
  IconButton
} from "@mui/material";
import { 
  CameraAltOutlined, 
  ArrowBackIosNew
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Metadata from "../../components/layout/Metadata";

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
      <Metadata title="Update Avatar | Sopyshop" />
      <Box sx={{ bgcolor: "background.default", py: 10, minHeight: "100vh" }}>
        <Container maxWidth="xs">
          <Paper 
            elevation={0}
            sx={{ 
              p: 5, 
              borderRadius: 2, 
              border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
              bgcolor: "background.paper",
              textAlign: 'center',
              boxShadow: theme.shadows[1]
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 4 }}>
              <IconButton onClick={() => navigate("/account")} sx={{ color: 'text.secondary', p: 0.5 }}>
                <ArrowBackIosNew sx={{ fontSize: 16 }} />
              </IconButton>
              <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', color: 'text.secondary' }}>
                Profile Image
              </Typography>
            </Stack>

            <Typography variant="h3" sx={{ fontWeight: 950, mb: 1, letterSpacing: '-0.04em' }}>
              Update Avatar
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 6, fontWeight: 500 }}>
              Choose a photo that represents you best.
            </Typography>

            <Box component="form" onSubmit={updateAvatarSubmit}>
              <Stack spacing={6} alignItems="center">
                <Box sx={{ position: 'relative' }}>
                  <Avatar 
                    src={avatarPreview} 
                    sx={{ 
                      width: 200, 
                      height: 200, 
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      boxShadow: theme.shadows[15]
                    }} 
                  />
                  <IconButton
                    component="label"
                    sx={{ 
                      position: 'absolute', 
                      bottom: 8, 
                      right: 8, 
                      bgcolor: 'primary.main', 
                      color: '#fff',
                      '&:hover': { bgcolor: 'primary.dark' },
                      width: 45,
                      height: 45,
                      border: `4px solid ${theme.palette.background.paper}`,
                      boxShadow: theme.shadows[4]
                    }}
                  >
                    <CameraAltOutlined />
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </IconButton>
                </Box>
                
                <Box sx={{ width: '100%' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading || !avatar}
                    sx={{ 
                      py: 2, 
                      fontWeight: 900, 
                      borderRadius: 1,
                      letterSpacing: 1,
                      boxShadow: 'none',
                      '&:hover': { boxShadow: theme.shadows[4] }
                    }}
                  >
                    {loading ? <CircularProgress size={20} color="inherit" /> : "PROCEED WITH UPLOAD"}
                  </Button>
                  {!avatar && (
                    <Typography variant="caption" color="text.disabled" sx={{ mt: 2, display: 'block', fontWeight: 600 }}>
                      Please select an image to enable upload
                    </Typography>
                  )}
                </Box>
              </Stack>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default UpdateAvatar;
