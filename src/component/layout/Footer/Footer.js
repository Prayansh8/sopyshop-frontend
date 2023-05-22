import React from "react";
import "./Footer.css";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import logo from "../../../images/logo.png";

export default function Footer() {
  return (
    <>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 px-5 border-top bg-dark">
        <div className="col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 color-white text-decoration-none lh-1"
          >
            <img
              src={logo}
              alt="Company logo"
              className="logoimg color-white"
            />
          </a>
          <span className="mb-3 mb-md-0 color-white">
            © 2023 sopyshop, By Prayansh Gupta
          </span>
        </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="color-white" href="/">
              <svg className="bi" width={24} height={24}>
                <FaTwitter />
              </svg>
            </a>
          </li>
          <li className="ms-3">
            <a className="color-white" href="/">
              <svg className="bi" width={24} height={24}>
                <FaInstagram />
              </svg>
            </a>
          </li>
          <li className="ms-3">
            <a className="color-white" href="/">
              <svg className="bi" width={24} height={24}>
                <FaFacebook />
              </svg>
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
}
