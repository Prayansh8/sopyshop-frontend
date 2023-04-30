import React, { Fragment, useState } from "react";
import { Face, MailOutlineOutlined } from "@mui/icons-material";
import "./UpdateUser.css";
import { useDispatch } from "react-redux";
import { update } from "../../actions/userAction";

const UpdateUser = ({ user, loading }) => {
  const dispatch = useDispatch();

  let userAvatar = user.avatar;
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(userAvatar);

  const handleImageChange = (e) => {
    setAvatar(e.target.files[0]);
    setAvatarPreview(URL.createObjectURL(e.target.files[0]));
  };

  const updateSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("avatar", avatar);
    dispatch(update(formData));
    window.location.href = "/";
  };
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
