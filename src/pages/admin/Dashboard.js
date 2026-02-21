import React, { useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { Link } from "react-router-dom";
import { 
  Paper, 
  Grid, 
  Typography, 
  Box, 
  Card, 
  useTheme,
  alpha 
} from "@mui/material";

// Import MUI X Charts
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getAllOrdersByAdmin } from "../../redux/actions/orderAction";
import { toast } from "react-toastify";
import { getAllUsers } from "../../redux/actions/userAction";
import { getAdminProducts } from "../../redux/actions/productAction";
import { Inventory, ShoppingCart, People, AttachMoney, TrendingUp } from "@mui/icons-material";

const DashboardInfoCard = ({ title, count, icon, color, linkTo, theme, sparklineData }) => (
  <Card 
    component={linkTo ? Link : 'div'} 
    to={linkTo} 
    sx={{ 
      textDecoration: 'none', 
      display: 'flex', 
      alignItems: 'center', 
      p: 3, 
      borderRadius: 2,
      boxShadow: theme.shadows[2],
      transition: 'transform 0.2s',
      position: 'relative',
      overflow: 'hidden',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[6]
      }
    }}
  >
    <Box 
      sx={{ 
        p: 2, 
        borderRadius: 2, 
        bgcolor: alpha(color, 0.1), 
        color: color, 
        display: 'flex', 
        mr: 3,
        zIndex: 2
      }}
    >
      {icon}
    </Box>
    <Box sx={{ zIndex: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5 }}>
        {count}
      </Typography>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1 }}>
        {title}
      </Typography>
    </Box>
    
    {sparklineData && sparklineData.length > 0 && (
      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50px', opacity: 0.3 }}>
        <SparkLineChart data={sparklineData} colors={[color]} showTooltip yield="false" />
      </Box>
    )}
  </Card>
);

const Dashboard = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { orders, totalAmount, error } = useSelector((state) => state.orders);
  const { users } = useSelector((state) => state.getAllUsers);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getAllOrdersByAdmin());
    dispatch(getAllUsers());
    dispatch(getAdminProducts());
  }, [error, dispatch]);

  const rawOrders = orders || [];
  const rawProducts = products || [];
  const rawUsers = users || [];

  // 1. Order Revenue Sparkline
  const revenueTrendData = rawOrders.map(order => order.totalPrice || 0).reverse();

  // 2. Revenue over Time Line Chart (Assuming orders sorted by time)
  const xDataOrderSequence = rawOrders.map((_, i) => i + 1);
  const yDataRevenue = rawOrders.map(order => order.totalPrice || 0).reverse();

  // 3. Output order statuses mapped to pie chart format
  const statusCounts = rawOrders.reduce((acc, order) => {
    const status = order.orderStatus || "Pending";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});
  
  const statusPieData = Object.keys(statusCounts).map((status, index) => ({
    id: index,
    value: statusCounts[status],
    label: status,
    color: status === "Delivered" ? theme.palette.success.main 
         : status === "Shipped" ? theme.palette.info.main 
         : theme.palette.warning.main
  }));

  // 4. Bar Chart for Product Categories
  const categoryCounts = rawProducts.reduce((acc, product) => {
    const cat = product.category || "Other";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const barChartCategories = Object.keys(categoryCounts);
  const barChartValues = Object.values(categoryCounts);

  return (
    <AdminLayout title="Analytics Dashboard">
      <Box sx={{ pb: 4 }}>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardInfoCard 
              title="Total Revenue" 
              count={`₹${totalAmount || 0}`} 
              icon={<AttachMoney fontSize="large" />} 
              color={theme.palette.success.main}
              linkTo="/admin/orders"
              theme={theme}
              sparklineData={revenueTrendData}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardInfoCard 
              title="Total Products" 
              count={rawProducts.length} 
              icon={<Inventory fontSize="large" />} 
              color={theme.palette.primary.main}
              linkTo="/admin/product"
              theme={theme}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardInfoCard 
              title="Total Orders" 
              count={rawOrders.length} 
              icon={<ShoppingCart fontSize="large" />} 
              color={theme.palette.warning.main}
              linkTo="/admin/orders"
              theme={theme}
              sparklineData={revenueTrendData.slice(-10)} // Show last 10 trend
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardInfoCard 
              title="Total Users" 
              count={rawUsers.length} 
              icon={<People fontSize="large" />} 
              color={theme.palette.info.main}
              linkTo="/admin/users"
              theme={theme}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* Revenue Trend Line Chart */}
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: theme.shadows[2], height: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp color="primary" /> Revenue Trend (Last Orders)
              </Typography>
              <Box sx={{ height: 350, width: '100%' }}>
                {rawOrders.length > 0 ? (
                  <LineChart
                    xAxis={[{ 
                      data: xDataOrderSequence, 
                      scaleType: 'point',
                      label: "Order Sequence"
                    }]}
                    series={[
                      {
                        data: yDataRevenue,
                        color: theme.palette.primary.main,
                        label: 'Order Value (₹)',
                        showMark: true,
                        curve: "catmullRom",
                        area: true
                      },
                    ]}
                    height={300}
                    margin={{ left: 50, right: 20, top: 20, bottom: 40 }}
                  />
                ) : (
                  <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography color="text.secondary">No order data available yet</Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Order Status Pie Chart */}
          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: theme.shadows[2], height: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Fulfillment Breakdown</Typography>
              <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
                {statusPieData.length > 0 ? (
                  <PieChart
                    series={[
                      {
                        data: statusPieData,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        innerRadius: 40,
                        outerRadius: 100,
                        paddingAngle: 5,
                        cornerRadius: 5,
                        cx: 140,
                      },
                    ]}
                    slotProps={{
                      legend: {
                        direction: 'column',
                        position: { vertical: 'middle', horizontal: 'right' },
                        padding: 0,
                      },
                    }}
                    height={300}
                    margin={{ right: 120 }}
                  />
                ) : (
                  <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography color="text.secondary">No order status data</Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Category Distribution Bar Chart */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: theme.shadows[2] }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Product Catalog Distribution</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Number of items stocked by category</Typography>
              <Box sx={{ height: 350, width: '100%' }}>
                {barChartCategories.length > 0 ? (
                  <BarChart
                    xAxis={[{ scaleType: 'band', data: barChartCategories }]}
                    series={[
                      { 
                        data: barChartValues, 
                        color: theme.palette.info.main,
                        label: 'Total Items'
                      }
                    ]}
                    height={300}
                    borderRadius={4}
                    margin={{ top: 20, bottom: 30, left: 40, right: 10 }}
                  />
                ) : (
                  <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography color="text.secondary">No product categories data available</Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

        </Grid>
      </Box>
    </AdminLayout>
  );
};

export default Dashboard;
