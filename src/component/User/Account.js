import React, { Fragment } from "react";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../actions/userAction";
import LoginSignUp from "./LoginSignUp";
import "./Account.css";
import MataData from "../layout/MataData";
import profile from "./admin.jpeg";
export default function Account({ user, loading, isAuthenticated }) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <Fragment>
      <MataData title={"Sopyshop-Account"} />
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
                      src={profile}
                      alt="Profile"
                      width={300}
                      height={300}
                      className="rounded-circle me-2"
                    />
                  </div>
                  <div className="editBtnDiv">
                    <Link to="/update/avatar">
                      <button className="editBtn">Edit Profile</button>
                    </Link>
                  </div>
                  <div className="editBtnDiv">
                    <Link to="/update">
                      <button className="editBtn">Edit Details</button>
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
                          <td>{user.user.firstName} {user.user.lastName}</td>
                        </tr>
                        <tr>
                          <th>email:</th>
                          <td>{user.user.email}</td>
                        </tr>
                        <tr>
                          <th>phone:</th>
                          <td>{user.user.phone}</td>
                        </tr>
                        <tr>
                          <th>Dob: </th>
                          <td>{user.user.dob}</td>
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
                      <button className="editBtnDetails" onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  </div>
                  <br />
                  <div>
                    {user.role === "admin" ? (
                      <div>
                        <Link to="/admin/dashboard">
                          <button className="editBtnDetails">Dashboard</button>
                        </Link>
                      </div>
                    ) : (
                      <div></div>
                    )}
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
