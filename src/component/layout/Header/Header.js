import React from "react";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import logo from "../../../images/logo.png";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid mx-3">
          <Link className="navbar-brand logo" to="/">
            <img src={logo} alt="shopyshop" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/cart">
                  <FaShoppingCart className="text-white" />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/profile">
                  <FaUser className="text-white" />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/search">
                  <FaSearch className="text-white" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
