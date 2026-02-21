import {
  GET_WISHLIST_REQUEST,
  GET_WISHLIST_SUCCESS,
  GET_WISHLIST_FAIL,
  TOGGLE_WISHLIST_REQUEST,
  TOGGLE_WISHLIST_SUCCESS,
  TOGGLE_WISHLIST_FAIL,
  CLEAR_ERRORS,
} from "../constants/wishlistConstant";

export const wishlistReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_WISHLIST_REQUEST:
    case TOGGLE_WISHLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case TOGGLE_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case GET_WISHLIST_FAIL:
    case TOGGLE_WISHLIST_FAIL:
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
