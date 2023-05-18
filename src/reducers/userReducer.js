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
        user: action.payload.user,
        token: action.payload.token,
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
        error: action.payload.message,
      };
    case LOGOUT_USER_FAILURE:
      return {
        ...state,
        loding: false,
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

export const loadUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return { loding: true, isAuthenticated: false };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loding: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOAD_USER_FAILURE:
      return {
        loding: false,
        isAuthenticated: false,
        user: null,
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

// update user

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
      return { ...state, loding: true };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loding: false,
        users: action.payload.users,
      };
    case GET_ALL_USERS_FAILURE:
      return {
        loding: false,
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
      return { ...state, loding: true };
    case ADMIN_UPDATE_USER_SUCCESS:
      return {
        ...state,
        loding: false,
        isUpdated: action.payload,
      };
    case ADMIN_UPDATE_USER_FAILURE:
      return {
        ...state,
        loding: false,
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
