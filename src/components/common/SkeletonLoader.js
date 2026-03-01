import React from "react";
import { Box, Skeleton, Grid, Container } from "@mui/material";

// Generic Page Skeleton
export const PageSkeleton = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 4, mb: 4 }} />
    <Grid container spacing={4}>
      {[1, 2, 3, 4].map((i) => (
        <Grid item xs={12} sm={6} md={3} key={i}>
          <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2, mb: 1 }} />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </Grid>
      ))}
    </Grid>
  </Container>
);

// Product Detail Skeleton
export const ProductDetailSkeleton = () => (
  <Container maxWidth="lg" sx={{ py: 8 }}>
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <Skeleton variant="rectangular" height={500} sx={{ borderRadius: 4 }} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Skeleton variant="text" height={60} width="80%" sx={{ mb: 2 }} />
        <Skeleton variant="text" height={30} width="40%" sx={{ mb: 4 }} />
        <Skeleton variant="rectangular" height={100} sx={{ mb: 4, borderRadius: 2 }} />
        <Skeleton variant="rectangular" height={50} width="200px" sx={{ borderRadius: 2 }} />
      </Grid>
    </Grid>
  </Container>
);

// Account/Profile Skeleton
export const AccountSkeleton = () => (
  <Container maxWidth="md" sx={{ py: 8 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 6 }}>
      <Skeleton variant="circular" width={100} height={100} sx={{ mr: 4 }} />
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" height={40} width="40%" />
        <Skeleton variant="text" height={20} width="20%" />
      </Box>
    </Box>
    <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 4 }} />
  </Container>
);

// Order Skeleton
export const OrderSkeleton = () => (
  <Container maxWidth="md" sx={{ py: 4 }}>
    <Skeleton variant="text" height={40} width="30%" sx={{ mb: 2 }} />
    {[1, 2, 3].map((i) => (
      <Skeleton key={i} variant="rectangular" height={100} sx={{ mb: 2, borderRadius: 2 }} />
    ))}
  </Container>
);

export default PageSkeleton;
