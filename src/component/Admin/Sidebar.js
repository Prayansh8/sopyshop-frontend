import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-100">
      <div className="d-flex flex-column flex-shrink-0 text-bg-dark h-100">
        <Link
          to="/admin/dashboard"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-4">Admin Dashboard</span>
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li>
            <Link to="/admin/dashboard" className="nav-link text-white">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/orders" className="nav-link text-white">
              Orders
            </Link>
          </li>
          <li>
            <Link to="/admin/product" className="nav-link text-white">
              Products
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="nav-link text-white">
              Users
            </Link>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  );
};

export default Sidebar;
