import React from "react";
import "./Footer.css";
import logo from "../../../images/logo.png";

export default function Footer() {
  return (
    <>
      <footer className="d-flex flex-wrap bg-dark">
        <div className="d-flex align-items-center m-auto">
          <a href="/" className="mb-md-0 color-white text-decoration-none lh-1">
            <img
              src={logo}
              alt="Company logo"
              className="logoimg color-white"
            />
          </a>
          <span className="color-white footer-text">
            © 2023 sopyshop, By Prayansh Gupta
          </span>
        </div>
      </footer>
    </>
  );
}
