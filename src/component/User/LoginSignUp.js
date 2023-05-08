import React, { Fragment, useState } from "react";
import { Face, LockOpen, MailOutlineOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./LoginSignUp.css";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, ragister } from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";
import { useEffect } from "react";
import profile from "./profile.png";

export default function LoginSignUp() {
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.products
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginpassword, setLoginPassword] = useState("");
  const [value, setValue] = React.useState("1");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(profile);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginpassword));
    window.location.href = "/";
  };

  const handleImageChange = (e) => {
    setAvatar(e.target.files[0]);
    setAvatarPreview(URL.createObjectURL(e.target.files[0]));
  };

  const ragisterSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);
    dispatch(ragister(formData));
    window.location.href = "/account";
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      alert("login succesfull");
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
                      <input
                        type="submit"
                        value="Login"
                        className="submitBtn"
                      />
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
                          value={name}
                          name="name"
                          required
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="RagisterFormText">
                        <MailOutlineOutlined />
                        <input
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={email}
                          required
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="RagisterFormText">
                        <LockOpen />
                        <input
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={password}
                          required
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="registerImage">
                        <img src={avatarPreview} alt="Avatar Preview" />
                        <input
                          type="file"
                          name="avatar"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </div>
                      <input
                        type="submit"
                        value="Ragister"
                        className="submitBtn"
                        disabled={loading ? true : false}
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
