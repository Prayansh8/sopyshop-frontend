import React, { Fragment, useState } from "react";
import { Face, LockOpen, MailOutlineOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./LoginSignUp.css";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { config } from "../../config";
export default function LoginSignUp() {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  )
  const [loginUserName, setLoginUserName] = useState("");
  const [loginpassword, setLoginPassword] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginUserName, loginpassword));
    toast.success("Success")
    window.location.reload();
  };
  const registerSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name, userName, password
    }
    const configData = {
      headers: { "Constant-Type": "multipart/form-data" },
    };
    const data = axios.post(
      `${config.baseUrl}/api/v1/register`,
      userData,
      configData
    );
    if (data) {
      toast.success("Success")
      window.location.reload();
    } else {
      toast.error("Failed!")
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, isAuthenticated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="loginSignupContainer">
            <div className="loginSignupBox">
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab className="loginBtn" label="Login" value="1" />
                      <Tab className="registerBtn" label="register" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <form onSubmit={loginSubmit} className="loginForm">
                      <div className="loginFormEmail">
                        <MailOutlineOutlined />
                        <input
                          id="login"
                          type="username"
                          placeholder="username"
                          value={loginUserName}
                          onChange={(e) => setLoginUserName(e.target.value)}
                          minLength="4"
                          maxLength="32"
                          required
                        />
                      </div>
                      <div className="loginFormPassword">
                        <LockOpen />
                        <input
                          type="password"
                          placeholder="Password"
                          value={loginpassword}
                          required
                          onChange={(e) => setLoginPassword(e.target.value)}
                          minLength="4"
                          maxLength="32"
                        />
                      </div>
                      <Link className="forwardPassword" to="/account">
                        Farget Password?
                      </Link>
                      <br />
                      <input
                        type="submit"
                        value="Login"
                        className="submitBtn"
                      />
                    </form>
                  </TabPanel>
                  <TabPanel value="2">
                    <form
                      id="register"
                      onSubmit={registerSubmit}
                      className="loginForm"
                    >
                      <div className="registerFormText">
                        <Face />
                        <input
                          type="text"
                          placeholder="Name"
                          value={name}
                          name="name"
                          required
                          onChange={(e) => setName(e.target.value)}
                          minLength="2"
                          maxLength="32"
                        />
                      </div>
                      <div className="registerFormText">
                        <MailOutlineOutlined />
                        <input
                          type="text"
                          placeholder="username"
                          name="username"
                          value={userName}
                          required
                          onChange={(e) => setUserName(e.target.value)}
                          minLength="4"
                          maxLength="32"
                        />
                      </div>
                      <div className="registerFormText">
                        <LockOpen />
                        <input
                          id="psw"
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          minLength="4"
                          maxLength="32"
                        />
                      </div>
                      <input
                        type="submit"
                        value="register"
                        className="submitBtn"
                      />
                    </form>
                  </TabPanel>
                </TabContext>
              </Box>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
