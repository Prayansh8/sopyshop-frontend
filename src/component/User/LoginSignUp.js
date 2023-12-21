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
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [value, setValue] = React.useState("1");
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  const isValidPassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,32}$/;
    return passwordRegex.test(password);
  };

  const isValidemail = (email) => {
    const emailRegex = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    return emailRegex.test(email);
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    if (!isValidemail) {
      setEmailError(
        "Minimum 6 and maximum 32 characters, at least one uppercase letter, one lowercase letter, one number and one special character:"
      );
      return;
    }
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
    dispatch(ragister(formData))
      .then(() => {
        setSubmitSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        setSubmitSuccess(false);
      });
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
                        {emailError && (
                          <div className="passwordValid">{emailError}</div>
                        )}
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
                      <input
                        type="submit"
                        value="register"
                        className="submitBtn"
                      />
                    </form>
                    {submitSuccess && (
                      <p>
                        Form submitted successfully! Reloading in 3 seconds...
                      </p>
                    )}
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
