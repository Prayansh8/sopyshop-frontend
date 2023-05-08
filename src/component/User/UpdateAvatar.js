import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { UpdateAvatarAction } from "../../actions/userAction";

const UpdateAvatar = ({ user, loading }) => {
  const dispatch = useDispatch();

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
    window.location.href = "/account";
  };
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
    </Fragment>
  );
};

export default UpdateAvatar;
