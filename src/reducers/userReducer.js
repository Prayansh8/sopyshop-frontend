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
  UPDATE_USER_RESET,
  CLEAR_ERRORS,
  UPDATE_USER_AVATAR_REQUEST,
  UPDATE_USER_AVATAR_SUCCESS,
  UPDATE_USER_AVATAR_FAILURE,
  UPDATE_USER_AVATAR_RESET,
} from "../constants/userConstants";

export const userReducer = (state = { user: {}, token: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
      return { loding: true, isAuthenticated: false };
    case LOGIN_SUCCESS:
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loding: false,
        isAuthenticated: true,
        user: action.payload,
        token: action.payload,
      };

    case LOGOUT_USER_SUCCESS:
      return {
        loding: false,
        isAuthenticated: false,
        user: null,
      };

    case LOGIN_FAILURE:
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        loding: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };
    case LOGOUT_USER_FAILURE:
      return {
        ...state,
        loding: false,
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

export const loadUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return { loding: true, isAuthenticated: false };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loding: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOAD_USER_FAILURE:
      return {
        loding: false,
        isAuthenticated: false,
        user: null,
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

export const updateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
    case UPDATE_USER_AVATAR_REQUEST:
      return { ...state, loding: true };
    case UPDATE_USER_SUCCESS:
    case UPDATE_USER_AVATAR_SUCCESS:
      return {
        ...state,
        loding: false,
        isUpdated: action.payload,
      };
    case UPDATE_USER_FAILURE:
    case UPDATE_USER_AVATAR_FAILURE:
      return {
        ...state,
        loding: false,
        error: action.payload,
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
