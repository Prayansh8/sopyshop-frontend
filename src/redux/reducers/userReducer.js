import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  USER_LOGOUT,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_RESET,
  CLEAR_ERRORS,
  UPDATE_USER_AVATAR_REQUEST,
  UPDATE_USER_AVATAR_SUCCESS,
  UPDATE_USER_AVATAR_FAILURE,
  UPDATE_USER_AVATAR_RESET,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_SUCCESS,
  ADMIN_UPDATE_USER_FAILURE,
  ADMIN_UPDATE_USER_RESET,
  GET_USER_REQUEST,
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_RESET,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from "../constants/userConstants";


const initialState = {
  loading: false,
  userInfo: null,
  error: null,
  isAuthenticated: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_LOGOUT:
      return { ...state, userInfo: null };
    default:
      return state;
  }
};

export const loadUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return { ...state, loading: true, isAuthenticated: false };
    case USER_REGISTER_SUCCESS:
    case USER_LOGIN_SUCCESS:
    case LOAD_USER_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload, isAuthenticated: true };
    case LOAD_USER_FAILURE:
    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
      return {
        ...state, 
        loading: false,
        isAuthenticated: false,
        userInfo: null,
        error: action.payload
      };
    default:
      return state;
  }
};

// update user

export const updateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
    case UPDATE_USER_AVATAR_REQUEST:
      return { ...state, loading: true };
    case UPDATE_USER_SUCCESS:
    case UPDATE_USER_AVATAR_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case UPDATE_USER_FAILURE:
    case UPDATE_USER_AVATAR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case UPDATE_USER_RESET:
    case UPDATE_USER_AVATAR_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const getAllUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_ALL_USERS_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.users,
      };
    case GET_ALL_USERS_FAILURE:
      return {
        loading: false,
        users: null,
        error: action.payload.message,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// get product details
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case GET_USER_SUCCESS:
      return {
        user: action.payload,
        loading: false,
      };
    case GET_USER_FAILURE:
      return {
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Product Update By Admin
export const updateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_USER_REQUEST:
      return { ...state, loading: true };
    case ADMIN_UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case ADMIN_UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case ADMIN_UPDATE_USER_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// delete user
export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: true,
        message: action.payload.message,
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case DELETE_USER_RESET:
      return { ...state, isDeleted: false };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case FORGOT_PASSWORD_FAILURE:
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
