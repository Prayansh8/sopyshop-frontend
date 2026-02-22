import React from "react";
import { Box, Skeleton, Grid, Paper, alpha, useTheme } from "@mui/material";

export const ProductCardSkeleton = ({ horizontal = false }) => {
  const theme = useTheme();

  if (horizontal) {
    return (
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          borderRadius: 6,
          overflow: "hidden",
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}
      >
        <Skeleton variant="rectangular" sx={{ width: { xs: "100%", sm: 320, md: 400 }, height: { xs: 240, sm: "auto" }, minHeight: 240 }} />
        <Box sx={{ p: { xs: 3, md: 4 }, flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Skeleton variant="text" width="20%" height={24} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="60%" height={50} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="30%" height={24} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="80%" height={60} sx={{ mb: 3 }} />
          <Box sx={{ mt: 'auto', pt: 3, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
                <Skeleton variant="text" width={100} height={40} />
                <Skeleton variant="text" width={150} height={20} />
            </Box>
            <Skeleton variant="rectangular" width={160} height={50} sx={{ borderRadius: 3 }} />
          </Box>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 7,
        overflow: "hidden",
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}
    >
      <Skeleton variant="rectangular" sx={{ pt: '100%', width: '100%' }} />
      <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Skeleton variant="text" width="40%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="90%" height={32} />
        <Skeleton variant="text" width="70%" height={32} sx={{ mb: 1.5 }} />
        <Box sx={{ display: "flex", gap: 0.5, mb: 3, height: 24, alignItems: 'center' }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} variant="circular" width={16} height={16} />
          ))}
          <Skeleton variant="text" width={30} sx={{ ml: 1 }} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 'auto' }}>
          <Skeleton variant="text" width="40%" height={40} />
          <Skeleton variant="rectangular" width={44} height={44} sx={{ borderRadius: 3 }} />
        </Box>
      </Box>
    </Paper>
  );
};

export const ProductGridSkeleton = ({ count = 8, sm = 6, md = 3, lg = 3 }) => {
  return (
    <Grid container spacing={4}>
      {[...Array(count)].map((_, index) => (
        <Grid item key={index} xs={12} sm={sm} md={md} lg={lg} sx={{ display: "flex" }}>
          <ProductCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
};

export const ProductDetailsSkeleton = () => {
    return (
        <Box maxWidth="lg" sx={{ py: 6 }}>
            <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                    <Skeleton variant="rectangular" height={500} sx={{ borderRadius: 4 }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Box>
                            <Skeleton variant="text" width="80%" height={60} />
                            <Skeleton variant="text" width="30%" height={24} />
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Skeleton variant="rectangular" width={100} height={30} sx={{ borderRadius: 1 }} />
                            <Skeleton variant="text" width={80} height={30} />
                        </Box>
                        <Skeleton variant="rectangular" width="100%" height={2} />
                        <Skeleton variant="text" width="40%" height={60} />
                        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                            <Skeleton variant="rectangular" width={120} height={50} sx={{ borderRadius: 2 }} />
                            <Skeleton variant="rectangular" width={180} height={50} sx={{ borderRadius: 2 }} />
                        </Box>
                        <Skeleton variant="text" width="20%" height={30} />
                        <Box>
                            <Skeleton variant="text" width="30%" height={40} />
                            <Skeleton variant="text" width="100%" height={24} />
                            <Skeleton variant="text" width="100%" height={24} />
                            <Skeleton variant="text" width="70%" height={24} />
                        </Box>
                        <Skeleton variant="rectangular" width={150} height={40} sx={{ borderRadius: 2 }} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};
