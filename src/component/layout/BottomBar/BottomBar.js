import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaHome, FaShopify } from "react-icons/fa";
import { useSelector } from "react-redux";
import "./bottomBar.css";
export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("recents");
  const { cartItems } = useSelector((state) => state.cart);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation className="botBar" value={value} onChange={handleChange}>
      <Link className="btnLinks" to="/">
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<FaHome className="text-white homeIcon" />}
        />
      </Link>

      <Link className="btnLinks" to="/products">
        <BottomNavigationAction
          label="Products"
          value="products"
          icon={<FaShopify className="text-white homeIcon" />}
        />
      </Link>
      <Link className="btnLinks" to="/search">
        <BottomNavigationAction
          label="Search"
          value="search"
          icon={<FaSearch className="text-white homeIcon" />}
        />
      </Link>
      <Link className="btnLinks" to="/cart">
        <BottomNavigationAction
          label="Cart"
          value="cart"
          icon={<FaShoppingCart className="text-white homeIcon" />}
        />
        <span className="cartLength"> {cartItems.length} </span>
      </Link>
    </BottomNavigation>
  );
}
