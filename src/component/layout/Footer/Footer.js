import React from "react";
import { 
  Box, 
  Container, 
  Typography, 
  Link, 
  Stack, 
  IconButton, 
  alpha,
  useTheme 
} from "@mui/material";
import { Facebook, Instagram, Twitter, LinkedIn } from "@mui/icons-material";
import logo from "../../../images/logo.png";

export default function Footer() {
  const theme = useTheme();

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: theme.palette.background.paper,
        py: 6,
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4} alignItems="center" textAlign="center">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img src={logo} alt="Company logo" style={{ height: "40px" }} />
            <Typography variant="h5" sx={{ fontWeight: 800, color: theme.palette.primary.main }}>
              SOPYSHOP
            </Typography>
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: "500px" }}>
            Experience the finest quality organic products and global fashion at your fingertips. 
            Crafted with love and sustainability in mind.
          </Typography>

          <Stack direction="row" spacing={2}>
            {[Facebook, Instagram, Twitter, LinkedIn].map((Icon, index) => (
              <IconButton 
                key={index} 
                sx={{ 
                  color: theme.palette.text.secondary,
                  transition: "0.3s",
                  "&:hover": { color: theme.palette.primary.main, bgcolor: alpha(theme.palette.primary.main, 0.1) }
                }}
              >
                <Icon />
              </IconButton>
            ))}
          </Stack>

          <Box sx={{ borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`, pt: 4, width: "100%" }}>
            <Typography variant="caption" display="block" color="text.secondary">
              &copy; {new Date().getFullYear()} Sopyshop. All rights reserved.
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Developed by{" "}
              <Link 
                href="https://prayanshgupta.com/" 
                sx={{ color: theme.palette.primary.main, fontWeight: 600, textDecoration: "none" }}
              >
                Prayansh Gupta
              </Link>
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
