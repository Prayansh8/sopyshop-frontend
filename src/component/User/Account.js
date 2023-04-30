import React, { Fragment } from "react";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/userAction";
import LoginSignUp from "./LoginSignUp";
import "./Account.css";

export default function Account({ user, loading, isAuthenticated }) {
  const dispatch = useDispatch();

  function logoutUser() {
    dispatch(logout());
    alert("Logout Successfully");
  }
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {isAuthenticated ? (
            <div className="container accountContainer">
              <div className="container text-center det-coun">
                <div className="accountImg">
                  <div>
                    <img
                      src={user.avatar}
                      alt="Profile"
                      width={300}
                      height={300}
                      className="rounded-circle me-2"
                    />
                  </div>
                  <div className="editBtnDiv">
                    <Link to="/update">
                      <button className="editBtn">Edit Profile</button>
                    </Link>
                  </div>
                </div>
                <div className="accountDetails">
                  <div className="accountDetails-1">
                    <div className="detailsHed">
                      <h1>Details</h1>
                    </div>
                    <table className="acc-table">
                      <tbody>
                        <tr>
                          <th>Name</th>
                          <td>{user.name}</td>
                        </tr>
                        <tr>
                          <th>Email:</th>
                          <td>{user.email}</td>
                        </tr>
                        <tr>
                          <th>Role: </th>
                          <td>{user.role}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <br />
                  <div className="d-flex">
                    <div className="w-50">
                      <Link to="/orders">
                        <button className="editBtnDetails">Orders</button>
                      </Link>
                    </div>
                    <div className="w-50">
                      <button className="editBtnDetails" onClick={logoutUser}>
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <LoginSignUp />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
