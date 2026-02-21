import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, useTheme } from "@mui/material";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ProductDetails from "./pages/product/ProductDetails";
import Products from "./pages/product/Products";
import LoginSignUp from "./pages/user/LoginSignUp";
import Account from "./pages/user/Account";
import UpdateUser from "./pages/user/UpdateUser";
import Cart from "./pages/cart/Cart";
import Shipping from "./pages/cart/Shipping";
import UpdateAvatar from "./pages/user/UpdateAvatar";
import Dashboard from "./pages/admin/Dashboard";
import ProductList from "./pages/admin/ProductList";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import UpdateProduct from "./pages/admin/UpdateProduct";
import AdminUpdateUser from "./pages/admin/AdminUpdateUser";
import ConfirmOrder from "./pages/cart/ConfirmOrder";
import PaymentProcess from "./pages/cart/PaymentProcess";
import OrderSuccess from "./pages/cart/OrderSuccess";
import OrdersList from "./pages/admin/OrdersList";
import OrderUpdate from "./pages/admin/OrderUpdate";
import MyOrders from "./pages/orders/MyOrders";
import SingleOrder from "./pages/orders/SingleOrder";
import Wishlist from "./pages/product/Wishlist";
import LabelBottomNavigation from "./components/layout/BottomBar";
import { Home } from "./pages/Home";
import Search from "./pages/product/SearchPage";

// Redux Actions
import { loadUser } from "./redux/actions/userAction";
import { getWishlist } from "./redux/actions/wishlistAction";
import { getAllProducts } from "./redux/actions/productAction";
import { getCategories } from "./redux/actions/categoryAction";

import { config } from "./config";
import "./App.css";

const stripeApiKey = config.stripe.stripeApi;
const stripePromise = loadStripe(stripeApiKey);

function App() {
  const { userInfo, isAuthenticated, loading } = useSelector((state) => state.loadUser);
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
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
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: "background.default" }}>
        <Header isAuthenticated={isAuthenticated} loading={loading} />
        
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />
            <Route path="/search" element={<Search />} />
            <Route path="/process/payment" element={<Elements stripe={stripePromise}><PaymentProcess /></Elements>} />
            <Route path="/cart" element={<Cart isAuthenticated={isAuthenticated} />} />
            <Route path="/login" element={<LoginSignUp />} />
            <Route path="/account" element={<Account user={userInfo} isAuthenticated={isAuthenticated} loading={loading} />} />
            {isAuthenticated && (
              <>
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/order/confirm" element={<ConfirmOrder />} />
                <Route path="/success" element={<OrderSuccess />} />
                <Route path="/orders" element={<MyOrders />} />
                <Route path="/order/:id" element={<SingleOrder />} />
                <Route path="/update" element={<UpdateUser user={userInfo} loading={loading} />} />
                <Route path="/update/avatar" element={<UpdateAvatar user={userInfo} loading={loading} />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/admin/order/:id" element={<OrderUpdate />} />
              </>
            )}
            {userInfo && userInfo.user.role === "admin" && (
              <>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/product" element={<ProductList />} />
                <Route path="/admin/create/product" element={<CreateProduct />} />
                <Route path="/admin/update/product/:id" element={<UpdateProduct />} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/user/:id" element={<AdminUpdateUser />} />
                <Route path="/admin/orders" element={<OrdersList />} />
              </>
            )}
          </Routes>
        </Box>

        <Box sx={{ display: { xs: 'block', md: 'none' }, height: 56 }}>
           <LabelBottomNavigation />
        </Box>

        <Footer />
        <ToastContainer position="bottom-center" autoClose={3000} theme={theme.palette.mode} />
      </Box>
    </Router>
  );
}

export default App;
