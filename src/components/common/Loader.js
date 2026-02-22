import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loader() {
  return (
    <Box 
      sx={{ 
        width: "100%", 
        height: "100vh", 
        display: "flex", 
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center",
        bgcolor: "background.default"
      }}
    >
      <CircularProgress color="primary" size={60} thickness={4} />
      <Typography variant="h6" sx={{ mt: 2, color: "text.secondary", fontWeight: 500 }}>
        Loading experience...
      </Typography>
    </Box>
  );
}
