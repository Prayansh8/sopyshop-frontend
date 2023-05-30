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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginSignUp() {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginpassword, setLoginPassword] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(profile);
  const [passwordError, setPasswordError] = useState("");
  const [fileError, setFileError] = useState("");

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    if (!isValidPassword(loginpassword)) {
      setPasswordError(
        "Minimum 6 and maximum 32 characters, at least one uppercase letter, one lowercase letter, one number and one special character:"
      );
      return;
    }
    dispatch(login(loginEmail, loginpassword));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileSizeInBytes = file.size;
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

    if (fileSizeInBytes > maxSizeInBytes) {
      setFileError("File size exceeds the limit of 5MB.");
      setAvatar(null);
    } else {
      setFileError("");
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const isValidPassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,32}$/;
    return passwordRegex.test(password);
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    if (!isValidPassword(password)) {
      setPasswordError(
        "Minimum 6 and maximum 32 characters, at least one uppercase letter, one lowercase letter, one number and one special character:"
      );
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);
    dispatch(ragister(formData));
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      setTimeout(() => {
        window.location.reload();
      }, 500);
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
                          type="email"
                          placeholder="Email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          minLength="6"
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
                          minLength="6"
                          maxLength="32"
                        />
                        {passwordError && (
                          <div className="passwordValid">{passwordError}</div>
                        )}
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
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={email}
                          required
                          onChange={(e) => setEmail(e.target.value)}
                          minLength="6"
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
                          minLength="6"
                          maxLength="32"
                        />
                        {passwordError && (
                          <div className="passwordValid">{passwordError}</div>
                        )}
                      </div>
                      <div className="registerImage">
                        <img src={avatarPreview} alt="Avatar Preview" />
                        <input
                          type="file"
                          name="avatar"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        <div className="m-1">
                          <span className="text-danger">
                            {fileError && <div>({fileError})</div>}
                          </span>
                          {avatar && <div>(Selected file: {avatar.name})</div>}
                        </div>
                      </div>
                      <input
                        type="submit"
                        value="register"
                        className="submitBtn"
                        disabled={fileError ? true : false}
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
