import { CheckCircle } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircle />
      <p> Your Order has been Placed Successfully </p>
      <Link to="/order/me">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
