import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateAvatarAction, clearErrors } from "../../actions/userAction";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateAvatar = ({ user, loading }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.update);

  let userAvatar = user.avatar;
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(userAvatar);

  const handleImageChange = (e) => {
    setAvatar(e.target.files[0]);
    setAvatarPreview(URL.createObjectURL(e.target.files[0]));
  };

  const updateAvatarSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", avatar);
    dispatch(UpdateAvatarAction(formData));
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
        <form id="update" onSubmit={updateAvatarSubmit} className="loginForm">
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
      <ToastContainer />
    </Fragment>
  );
};

export default UpdateAvatar;
