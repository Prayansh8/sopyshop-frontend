import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="h-100">
      <div className="d-flex flex-column flex-shrink-0 text-bg-dark h-100">
        <div className="desh-side">
          <Link
            to="/admin/dashboard"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none justify-content-center
            "
          >
            <span className="desh-text">Admin Dashboard</span>
          </Link>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li>
              <Link to="/admin/dashboard" className="nav-link text-white detx">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/orders" className="nav-link text-white detx">
                Orders
              </Link>
            </li>
            <li>
              <Link to="/admin/product" className="nav-link text-white detx">
                Products
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className="nav-link text-white detx">
                Users
              </Link>
            </li>
          </ul>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
