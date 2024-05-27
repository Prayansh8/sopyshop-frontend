import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import WebFont from "webfontloader";
import { ToastContainer } from "react-toastify";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import LoginSignUp from "./component/User/LoginSignUp";
import Account from "./component/User/Account";
import UpdateUser from "./component/User/UpdateUser";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import UpdateAvatar from "./component/User/UpdateAvatar";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import CreateProduct from "./component/Admin/CreateProduct";
import Users from "./component/Admin/Users";
import UpdateProduct from "./component/Admin/UpdateProduct";
import AdminUpdateUser from "./component/Admin/AdminUpdateUser";
import ConfirmOrder from "./component/Cart/ComfirmOrder";
import PaymentProcess from "./component/Cart/PaymentProcess";
import OrderSuccess from "./component/Cart/OrderSuccess";
import OrdersList from "./component/Admin/OrdersList";
import OrderUpdate from "./component/Admin/OrderUpdate";
import MyOrders from "./component/Orders/MyOrders";
import SingleOrder from "./component/Orders/SingleOrder";
import { loadUser } from "./actions/userAction";
import { config } from "./config";
import LabelBottomNavigation from "./component/layout/BottomBar/BottomBar";
import { Home } from "./component/Home/Home";
import { Search } from "./component/Product/Search";
import "./App.css"
function App() {
  const { userInfo, isAuthenticated, loading } = useSelector((state) => state.loadUser);
  console.log(userInfo, isAuthenticated, loading)
  const dispatch = useDispatch();

  const stripeApiKey = config.stripe.stripeApi;
  const stripePromise = loadStripe(stripeApiKey);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Chilanka"],
      },
    });
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <div style={{ height: "10%" }}>
        <Header isAuthenticated={isAuthenticated} loading={loading} />
      </div>
      <div
        className="main">
        <div className="mainContainerDiv">
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
        </div>
      </div>
      <div className="mobileBottomBar" style={{ height: "10%" }}>
        <LabelBottomNavigation />
      </div>
      <Footer />
      <ToastContainer />
    </Router>
  );
}

export default App;
