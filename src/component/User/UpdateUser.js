import React, { Fragment, useEffect, useState } from "react";
import { Face, MailOutlineOutlined } from "@mui/icons-material";
import "./UpdateUser.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, update } from "../../actions/userAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateUser = ({ user, loading }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.update);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const updateSubmit = (e) => {
    e.preventDefault();
    dispatch(update(name, email));
    setTimeout(() => {
      window.location.href = "/account";
    }, 500);
    toast.success("Update Success!");
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);
  return (
    <Fragment>
      <div className="userUpdate">
        <form id="update" onSubmit={updateSubmit} className="loginForm">
          <div className="updateFormText">
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
          <div className="updateFormText">
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
          <input
            type="submit"
            value="update"
            className="submitBtn"
            disabled={loading ? true : false}
          />
        </form>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
