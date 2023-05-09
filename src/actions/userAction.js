import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_AVATAR_REQUEST,
  UPDATE_USER_AVATAR_SUCCESS,
  UPDATE_USER_AVATAR_FAILURE,
  CLEAR_ERRORS,
} from "../constants/userConstants";
import { config } from "../config";

// Login

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const configData = {
      headers: {
        "Constant-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${config.baseUrl}/api/v1/get-token`,
      { email, password },
      configData
    );
    const token = await data.token;
    console.log(token);
    localStorage.setItem("token", token);
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response.data });
  }
};

// Register

export const ragister = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const configData = {
      headers: { "Constant-Type": "multipart/form-data" },
    };
    const { data } = await axios.post(
      `${config.baseUrl}/api/v1/register`,
      userData,
      configData
    );

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAILURE,
      payload: error.response.data,
    });
  }
};

// Load User

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const token = localStorage.getItem("token");
    const configData = {
      headers: { authorization: `Bearer ${token}` },
    };

    const { data } = await axios.get(`${config.baseUrl}/api/v1/me`, configData);
    dispatch({ type: LOAD_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAILURE, payload: error.response.data });
  }
};

// Logout user

export const logout = () => async (dispatch) => {
  try {
    await axios.post(`${config.baseUrl}/api/v1/logout`, null, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    dispatch({ type: LOGOUT_USER_SUCCESS });
    localStorage.removeItem("token");
  } catch (error) {
    dispatch({
      type: LOGOUT_USER_FAILURE,
      payload: error.response.data,
    });
  }
};

// Update user

export const update = (name, email) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });
    const token = localStorage.getItem("token");
    const configData = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.patch(
      `${config.baseUrl}/api/v1/me/update`,
      { name, email },
      configData
    );
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAILURE,
      payload: error.response.data,
    });
  }
};

// Update Avatar

export const UpdateAvatarAction = (myAvatar) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_AVATAR_REQUEST });

    const token = localStorage.getItem("token");
    const configData = {
      headers: {
        "Constant-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `${config.baseUrl}/api/v1/me/update/avatar`,
      myAvatar,
      configData
    );
    dispatch({ type: UPDATE_USER_AVATAR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_AVATAR_FAILURE,
      payload: error.response.data,
    });
  }
};

// clear error
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
