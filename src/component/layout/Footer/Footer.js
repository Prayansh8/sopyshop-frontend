import React from "react";
import "./Footer.css";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import logo from "../../../images/logo.png";

export default function Footer() {
  return (
    <>
      <footer className="footer mt-auto py-3">
        <div className="container">
          <div className="row">
            <div className="leftFooter w-25 col-sm-4 text-left m-auto">
              <h1>Download our app</h1>
              <p> Download app for andoroid and ios mobile phone.</p>
              <a href="https://itunes.apple.com/us/app/apple-store/id375380948?mt=8">
                <img
                  src="https://linkmaker.itunes.apple.com/assets/shared/badges/en-us/appstore-lrg.svg"
                  alt="Download on the App Store"
                />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.example.app">
                <img
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Get it on Google Play"
                />
              </a>
            </div>
            <div className="midFooter col-sm-4 w-50 m-auto text-center">
              <img src={logo} alt="Company logo" />
              <h1>Ecommerce</h1>
              <p>Copyright © 2023 Company Name</p>
            </div>
            <div className="rightFooter col-sm-4 w-25 m-auto text-right">
              <h1>Follow us on social media:</h1>
              <div style={{ display: "inline-grid" }}>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter /> Twitter
                </a>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook /> Facebook
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram /> Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
