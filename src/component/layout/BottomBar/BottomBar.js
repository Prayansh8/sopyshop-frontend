import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaHome, FaShopify } from "react-icons/fa";
import { useSelector } from "react-redux";
import "./bottomBar.css";
export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState(0);
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
          icon={<FaHome className="iconColor homeIcon" />}
        />
      </Link>

      <Link className="btnLinks" to="/products">
        <BottomNavigationAction
          label="Products"
          value="products"
          icon={<FaShopify className="iconColor homeIcon" />}
        />
      </Link>
      <Link className="btnLinks" to="/search">
        <BottomNavigationAction
          label="Search"
          value="search"
          icon={<FaSearch className="iconColor homeIcon" />}
        />
      </Link>
      <Link className="btnLinks" to="/cart">
        <span className="cartLength"> {cartItems.length} </span>
        <BottomNavigationAction
          label="Cart"
          value="cart"
          icon={<FaShoppingCart className="iconColor homeIcon" />}
        />
      </Link>
    </BottomNavigation>
  );
}
