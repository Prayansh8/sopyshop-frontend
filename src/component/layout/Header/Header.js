import React, { Fragment } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import logo from "../../../images/logo.png";
import { Link } from "react-router-dom";
import "./Header.css";
import profile from "../../../images/avatar.png";
import { useSelector } from "react-redux";

export default function Header({ user, isAuthenticated }) {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark deckstop-Nav">
        <div className="container-fluid px-4">
          <Link className="navbar-brand logo" to="/">
            <img src={logo} alt="sopyshop" />
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
                <Link className="nav-link text-white" to="/account">
                  Account
                </Link>
              </li>
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item nav-li">
                <Link className="nav-link text-white" to="/search">
                  <FaSearch className="text-white" />
                </Link>
              </li>
              <li className="nav-item nav-li ">
                <Link className="nav-link text-white" to="/cart">
                  <FaShoppingCart className="text-white cartIcon" />
                  <span className="cartLength"> {cartItems.length} </span>
                </Link>
              </li>
              {isAuthenticated ? (
                <li className="nav-item nav-li">
                  <Link
                    to="/account"
                    className="d-flex align-items-center text-white text-decoration-none m-auto accountImg"
                  >
                    <img
                      src={user.avatar}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="rounded-circle me-2"
                    />
                  </Link>
                </li>
              ) : (
                <li className="nav-item nav-li">
                  <Link
                    to="/account"
                    className="d-flex align-items-center text-white text-decoration-none m-auto"
                  >
                    <img
                      src={profile}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="rounded-circle me-2"
                    />
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* mobile nav */}

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mobile-Nav">
        <div className="container-fluid px-3">
          <Link className="navbar-brand logo" to="/">
            <img src={logo} alt="sopyshop" />
          </Link>

          <ul className="nav justify-content-end ">
            {isAuthenticated ? (
              <li className="nav-item nav-li">
                <Link
                  to="/account"
                  className="d-flex align-items-center text-white text-decoration-none m-auto accountImg"
                >
                  <img
                    src={user.avatar}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-circle"
                  />
                </Link>
              </li>
            ) : (
              <li className="nav-item nav-li">
                <Link
                  to="/account"
                  className="d-flex align-items-center text-white text-decoration-none m-auto"
                >
                  <img
                    src={profile}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-circle me-2"
                  />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </Fragment>
  );
}
