import React, { Fragment } from "react";
import Loader from "../layout/Loader/Loader";
import profile from "./profile.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/userAction";
import LoginSignUp from "./LoginSignUp";

export default function Account({ user, loading, isAuthenticated }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function dashboard() {
    navigate("/dashboard");
  }
  function orders() {
    navigate("/orders");
  }
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
            <div className="container my-4">
              <div className="container text-center d-flex">
                <div className="w-50">
                  <img
                    src={user.avatar}
                    alt="Profile"
                    width={300}
                    height={300}
                    className="rounded-circle me-2"
                  />
                </div>
                <div className="w-50">
                  <h2>name: {user.name}</h2>
                  <h2>Email: {user.email}</h2>
                  <h2>user: {user.role}</h2>
                  <div id="dashboard">
                    <button onClick={dashboard}>dashboard</button>
                  </div>
                  <div>
                    <button onClick={orders}>orders</button>
                  </div>
                  <div>
                    <button onClick={logoutUser}>Logout</button>
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
