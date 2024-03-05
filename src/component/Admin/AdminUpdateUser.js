import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {
  adminUpdateUserRole,
  clearErrors,
  getUserDetails,
} from "../../actions/userAction";
import EmailIcon from "@mui/icons-material/Email";
import "./AdminUpdateUser.css";
import { VerifiedUser } from "@mui/icons-material";

const AdminUpdateUser = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, error } = useSelector((state) => state.updateUser);
  const { user } = useSelector((state) => state.userDetails);

  const [username, setusername] = useState("");
  const [role, setRole] = useState("");

  let maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  const updateProductSubmit = () => {
    const formData = new FormData();
    formData.append("role", role);
    formData.append("username", username);

    dispatch(adminUpdateUserRole(formData));
    toast.success("update User Successful!");
  };

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setRole(user.role);
      setusername(user.username);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, user, id]);

  return (
    <Fragment>
      <div className="container">
        <div className="updateUserContaner">
          <form
            id="Product"
            onSubmit={updateProductSubmit}
            className="loginForm"
          >
            <div className="updateUserFormText">
              <EmailIcon />
              <input
                type="text"
                placeholder="username"
                name="username"
                onInput={maxLengthCheck}
                maxLength={32}
                readOnly
                value={username}
                onChange={(e) => setusername(e.target.value)}
                required
              />
            </div>
            <div className="updateUserFormText">
              <VerifiedUser />
              <select onChange={(e) => setRole(e.target.value)}>
                <option>{user.role}</option>
                <option className={user.role === "user" ? "d-none" : "d-block"}>
                  user
                </option>
                <option
                  className={user.role === "admin" ? "d-none" : "d-block"}
                >
                  admin
                </option>
              </select>
            </div>

            <input
              type="submit"
              value="Update"
              className="submitBtn"
              disabled={loading ? true : false}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminUpdateUser;
