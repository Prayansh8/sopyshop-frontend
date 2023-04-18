import React, { Fragment, useState } from "react";
import {
  AccountCircleOutlined,
  Face,
  LockOpen,
  MailOutlineOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./LoginSignUp.css";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userAction";

export default function LoginSignUp() {

  const dispatch = useDispatch()

  const [ragisterName, setRagisterName] = useState("");
  const [ragisterUsername, setRagisterUsername] = useState("");
  const [ragisterEmail, setRagisterEmail] = useState("");
  const [ragisterPassword, setRagisterPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginpassword, setLoginPassword] = useState("");
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const loginSubmit = (e) => {
    e.preventDefault()
    dispatch(login(loginEmail, loginpassword));
  };

  const ragisterSubmit = () => {
    console.log("Form Submit");
  };

  return (
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
                  <Tab className="ragisterBtn" label="Ragister" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <form onSubmit={loginSubmit} className="loginForm">
                  <div className="loginFormEmail">
                    <MailOutlineOutlined />
                    <input
                      id="login"
                      type="email"
                      placeholder="Email"
                      value={loginEmail}
                      required
                      onChange={(e) => setLoginEmail(e.target.value)}
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
                    />
                  </div>
                  <Link className="forwardPassword" to="/reset/password">
                    Farget Password?
                  </Link>
                  <br />
                  <input type="submit" value="Login" className="submitBtn" />
                </form>
              </TabPanel>
              <TabPanel value="2">
                <form
                  id="ragister"
                  onSubmit={ragisterSubmit}
                  className="loginForm"
                >
                  <div className="RagisterFormText">
                    <Face />
                    <input
                      type="text"
                      placeholder="Name"
                      value={ragisterName}
                      required
                      onChange={(e) => setRagisterName(e.target.value)}
                    />
                  </div>
                  <div className="RagisterFormText">
                    <AccountCircleOutlined />
                    <input
                      type="text"
                      placeholder="userName"
                      value={ragisterUsername}
                      required
                      onChange={(e) => setRagisterUsername(e.target.value)}
                    />
                  </div>
                  <div className="RagisterFormText">
                    <MailOutlineOutlined />
                    <input
                      type="email"
                      placeholder="Email"
                      value={ragisterEmail}
                      required
                      onChange={(e) => setRagisterEmail(e.target.value)}
                    />
                  </div>
                  <div className="RagisterFormText">
                    <LockOpen />
                    <input
                      type="password"
                      placeholder="Password"
                      value={ragisterPassword}
                      required
                      onChange={(e) => setRagisterPassword(e.target.value)}
                    />
                  </div>
                  <input type="submit" value="Ragister" className="submitBtn" />
                </form>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </Fragment>
  );
}
