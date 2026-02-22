import React from "react";
import { 
  Box, 
  Typography, 
  Rating, 
  Avatar, 
  Paper, 
  Stack, 
  useTheme, 
  alpha 
} from "@mui/material";
import profilePng from "../../assets/avatar.png";

export default function ReviewsCard({ review }) {
  const theme = useTheme();

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        height: "100%",
        borderRadius: 4, 
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        bgcolor: "background.paper",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
          borderColor: theme.palette.primary.main
        }
      }}
    >
      <Stack spacing={2}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar 
            src={profilePng} 
            alt={review.name} 
            sx={{ width: 48, height: 48, border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}` }}
          />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {review.name}
            </Typography>
            <Rating 
              value={review.rating} 
              precision={0.5} 
              readOnly 
              size="small" 
              sx={{ color: theme.palette.primary.main }}
            />
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic", lineWeight: 1.6 }}>
          "{review.comment}"
        </Typography>
      </Stack>
    </Paper>
  );
}
