import React, { Fragment } from "react";
import "./LoginSignUp.css";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignupForm from "../../sections/auth/SignupForm";
import SignInForm from "../../sections/auth/SignInForm";

export default function LoginSignUp() {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  )
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
                    <SignInForm />
                  </TabPanel>
                  <TabPanel value="2">
                    <SignupForm />
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
