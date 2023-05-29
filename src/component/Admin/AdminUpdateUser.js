import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {
  adminUpdateUser,
  clearErrors,
  getUserDetails,
} from "../../actions/userAction";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import "./AdminUpdateUser.css";
import { VerifiedUser } from "@mui/icons-material";

const AdminUpdateUser = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, error } = useSelector((state) => state.updateUser);
  const { user } = useSelector((state) => state.userDetails);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  let maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  const updateProductSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    formData.append("email", email);

    dispatch(adminUpdateUser(id));
    toast.success("update Product Successful!");
  };

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setRole(user.role);
      setEmail(user.email);
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
              <AccountCircleIcon />
              <input
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                required
                onChange={(e) => setName(e.target.value)}
                minLength="1"
                maxLength="32"
              />
            </div>
            <div className="updateUserFormText">
              <EmailIcon />
              <input
                type="text"
                placeholder="Email"
                name="Email"
                onInput={maxLengthCheck}
                maxLength={6}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="updateUserFormText">
            <VerifiedUser />
              <select onChange={(e) => setRole(e.target.value)}>
                <option>{user.role}</option>
                <option className={user.role === "user"?"d-none":"d-block"}>user</option>
                <option className={user.role === "admin"?"d-none":"d-block"}>admin</option>
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
