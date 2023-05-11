import React from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div>
      <div className="mainCont">
        <div className="rightCont">
          <Sidebar />
        </div>
        <div className="leftCont">
          <h2 className="text-center my-2">Dashboard</h2>
          <div className="totalAmount">
            <p>
              Total Amount <br /> ₹2000
            </p>
          </div>
          <div className="deshCount">
            <div className="productCont">
              <Link to={"/admin/product"}>
                <div className="productCont1">
                  <p>Product</p>
                  <p>40</p>
                </div>
              </Link>
            </div>
            <div className="orderCont">
              <Link to={"/admin/orders"}>
                <div className="productCont1">
                  <p>Orders</p>
                  <p>4</p>
                </div>
              </Link>
            </div>
            <div className="userCont">
              <Link to={"/admin/users"}>
                <div className="productCont1">
                  <p>Users</p>
                  <p>7</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="lineChart"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
