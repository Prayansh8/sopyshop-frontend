import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, useTheme, Container } from "@mui/material";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Loader from "./components/common/Loader";

// Redux Actions
import { getWishlist } from "./redux/actions/wishlistAction";
import { getAllProducts } from "./redux/actions/productAction";
import { getCategories } from "./redux/actions/categoryAction";

import { config } from "./config";
import LoginSignUp from "./pages/user/LoginSignUp";
import Account from "./pages/user/Account";
import "./App.css";

// Lazy Loaded Pages
const Home = lazy(() => import("./pages/Home").then(module => ({ default: module.Home })));
const ProductDetails = lazy(() => import("./pages/product/ProductDetails"));
const Products = lazy(() => import("./pages/product/Products"));
const UpdateUser = lazy(() => import("./pages/user/UpdateUser"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const Shipping = lazy(() => import("./pages/cart/Shipping"));
const UpdateAvatar = lazy(() => import("./pages/user/UpdateAvatar"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const ProductList = lazy(() => import("./pages/admin/ProductList"));
const CategoryList = lazy(() => import("./pages/admin/CategoryList"));
const CategoryCreate = lazy(() => import("./pages/admin/CategoryCreate"));
const CategoryUpdate = lazy(() => import("./pages/admin/CategoryUpdate"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const Users = lazy(() => import("./pages/admin/Users"));
const AdminUpdateUser = lazy(() => import("./pages/admin/AdminUpdateUser"));
const ConfirmOrder = lazy(() => import("./pages/cart/ConfirmOrder"));
const PaymentProcess = lazy(() => import("./pages/cart/PaymentProcess"));
const OrderSuccess = lazy(() => import("./pages/cart/OrderSuccess"));
const OrdersList = lazy(() => import("./pages/admin/OrdersList"));
const OrderUpdate = lazy(() => import("./pages/admin/OrderUpdate"));
const MyOrders = lazy(() => import("./pages/orders/MyOrders"));
const SingleOrder = lazy(() => import("./pages/orders/SingleOrder"));
const Wishlist = lazy(() => import("./pages/product/Wishlist"));
const Search = lazy(() => import("./pages/product/SearchPage"));
const ForgotPassword = lazy(() => import("./pages/user/ForgotPassword"));

const stripeApiKey = config.stripe.stripeApi;
const stripePromise = loadStripe(stripeApiKey);

const PageLayout = () => {
  const theme = useTheme();
  return (
    <Container 
      maxWidth={theme.layout?.containerMaxWidth || "lg"} 
      sx={{ width: '100%', pt: theme.spacing(3), pb: theme.spacing(3) }}
    >
      <Outlet />
    </Container>
  );
};

const PublicLayout = ({ isAuthenticated, loading }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Header isAuthenticated={isAuthenticated} loading={loading} />
    <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Outlet />
    </Box>
    <Footer />
  </Box>
);

function App() {
  const { userInfo, isAuthenticated, loading } = useSelector((state) => state.loadUser);
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(loadUser()); // Removed redundant API call as requested
    dispatch(getAllProducts());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getWishlist());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', bgcolor: "background.default"}}>
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Admin Routes */}
            {userInfo && userInfo.user.role === "admin" && (
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="product" element={<ProductList />} />
                <Route path="categories" element={<CategoryList />} />
                <Route path="category/new" element={<CategoryCreate />} />
                <Route path="update/category/:id" element={<CategoryUpdate />} />
                <Route path="users" element={<Users />} />
                <Route path="user/:id" element={<AdminUpdateUser />} />
                <Route path="orders" element={<OrdersList />} />
                <Route path="order/:id" element={<OrderUpdate />} />
              </Route>
            )}

            {/* Public Routes */}
            <Route element={<PublicLayout isAuthenticated={isAuthenticated} loading={loading} />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:keyword" element={<Products />} />
              <Route path="/login" element={<LoginSignUp />} />
              <Route path="/password/forgot" element={<ForgotPassword />} />
              
              <Route element={<PageLayout />}>
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/search" element={<Search />} />
                <Route path="/process/payment" element={<Elements stripe={stripePromise}><PaymentProcess /></Elements>} />
                <Route path="/cart" element={<Cart isAuthenticated={isAuthenticated} />} />
                <Route path="/account" element={<Account />} />
                <Route path="/wishlist" element={<Wishlist />} />
                
                {isAuthenticated && (
                  <>
                    <Route path="/shipping" element={<Shipping />} />
                    <Route path="/order/confirm" element={<ConfirmOrder />} />
                    <Route path="/success" element={<OrderSuccess />} />
                    <Route path="/orders" element={<MyOrders />} />
                    <Route path="/order/:id" element={<SingleOrder />} />
                    <Route path="/update" element={<UpdateUser user={userInfo} loading={loading} />} />
                    <Route path="/update/avatar" element={<UpdateAvatar user={userInfo} loading={loading} />} />
                  </>
                )}
                </Route>
            </Route>
          </Routes>
        </Suspense>

        <ToastContainer position="bottom-center" autoClose={3000} theme={theme.palette.mode} />
      </Box>
    </Router>
  );
}

export default App;
