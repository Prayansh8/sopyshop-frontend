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
  CLEAR_ERRORS,
} from "../constants/userConstants";

// Login

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { header: { "Constant-Type": "application/json" } };

    const { data } = await axios.post(
      "api/v1/get-token",
      { email, password },
      config
    );
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response.data.detail });
  }
};

// Register

export const ragister = (myData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { header: { "Constant-Type": "multipart/form-data" } };

    const { data } = await axios.post("api/v1/register", myData, config);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
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

    const { data } = await axios.get("api/v1/me");
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAILURE, payload: error.response.data });
  }
};

// Logout user

export const logout = () => async (dispatch) => {
  try {
    await axios.get("api/v1/logout");
    dispatch({ type: LOGOUT_USER_SUCCESS});
  } catch (error) {
    dispatch({ type: LOGOUT_USER_FAILURE, payload: error.response.data });
  }
};

// clear error
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};