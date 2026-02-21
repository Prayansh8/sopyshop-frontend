import {
  ALL_CATEGORIES_REQUEST,
  ALL_CATEGORIES_SUCCESS,
  ALL_CATEGORIES_FAILURE,
  CLEAR_ERRORS,
} from "../constants/categoryConstant";

export const categoryReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case ALL_CATEGORIES_REQUEST:
      return {
        loading: true,
        categories: [],
      };
    case ALL_CATEGORIES_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      };
    case ALL_CATEGORIES_FAILURE:
      return {
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
