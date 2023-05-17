import WebFont from "webfontloader";
import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Footer from "./component/layout/Footer/Footer.js";
import { Home } from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import { Search } from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import Account from "./component/User/Account";
import { useSelector } from "react-redux";
import UpdateUser from "./component/User/UpdateUser";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ComfirmOrder from "./component/Cart/ComfirmOrder.js";
import UpdateAvatar from "./component/User/UpdateAvatar";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import CreateProduct from "./component/Admin/CreateProduct";
import { ToastContainer } from "react-toastify";
import Users from "./component/Admin/Users";
import UpdateProduct from "./component/Admin/UpdateProduct";

function App() {
  const { user, isAuthenticated, loading } = useSelector(
    (state) => state.loadUser
  );

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header
          user={user}
          isAuthenticated={isAuthenticated}
          loading={loading}
        />
        <Routes>
          <Route extact path="/" element={<Home />} />
          <Route extact path="/product/:id" element={<ProductDetails />} />
          <Route extact path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route extact path="/search" element={<Search />} />
          <Route extact path="/shipping" element={<Shipping />} />
          <Route extact path="/order/comfirm" element={<ComfirmOrder />} />
          <Route
            extact
            path="/cart"
            element={<Cart isAuthenticated={isAuthenticated} />}
          />
          <Route extact path="/login" element={<LoginSignUp />} />
          <Route
            extact
            path="/account"
            element={
              <Account
                user={user}
                isAuthenticated={isAuthenticated}
                loading={loading}
              />
            }
          />

          {isAuthenticated && (
            <>
              <Route
                extact
                path="/update"
                element={<UpdateUser user={user} loading={loading} />}
              />
              <Route
                extact
                path="/update/avatar"
                element={<UpdateAvatar user={user} loading={loading} />}
              />
            </>
          )}
          {user && user.role === "admin" && (
            <>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/product" element={<ProductList />} />
              <Route path="/admin/create/product" element={<CreateProduct />} />
              <Route
                path="/admin/update/product/:id"
                element={<UpdateProduct />}
              />
              <Route path="/admin/orders" element={<Dashboard />} />
              <Route path="/admin/users" element={<Users />} />
            </>
          )}
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
