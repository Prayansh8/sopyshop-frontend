import React from "react";
import "./Footer.css";
import logo from "../../../images/logo.png";

export default function Footer() {
  return (
    <>
      <div class="footer">
        <a href="/" className="mb-md-0 color-white text-decoration-none lh-1">
          <img src={logo} alt="Company logo" className="logoimg color-white" />
        </a>
        &copy; 2023 sopyshop - Developed by&nbsp;
        <span>
          <a href="https://prayanshgupta.com/" class="red-text">
            Prayansh Gupta.
          </a>
        </span>
      </div>
    </>
  );
}
