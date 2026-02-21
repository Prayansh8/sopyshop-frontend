import axios from "axios";
import {
  GET_WISHLIST_REQUEST,
  GET_WISHLIST_SUCCESS,
  GET_WISHLIST_FAIL,
  TOGGLE_WISHLIST_REQUEST,
  TOGGLE_WISHLIST_SUCCESS,
  TOGGLE_WISHLIST_FAIL,
  CLEAR_ERRORS,
} from "../constants/wishlistConstant";
import { config } from "../../config";

// Get user wishlist
export const getWishlist = () => async (dispatch) => {
  try {
    dispatch({ type: GET_WISHLIST_REQUEST });

    const token = localStorage.getItem("sopyshop-token");
    const configData = {
      headers: { authorization: `Bearer ${token}` },
    };

    const { data } = await axios.get(`${config.baseUrl}/api/v1/wishlist`, configData);

    dispatch({
      type: GET_WISHLIST_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: GET_WISHLIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Toggle Wishlist (Add/Remove)
export const toggleWishlist = (productId) => async (dispatch) => {
  try {
    dispatch({ type: TOGGLE_WISHLIST_REQUEST });

    const token = localStorage.getItem("sopyshop-token");
    const configData = {
      headers: { 
        "Content-Type": "application/json",
        authorization: `Bearer ${token}` 
      },
    };

    const { data } = await axios.post(
      `${config.baseUrl}/api/v1/wishlist/toggle`,
      { productId },
      configData
    );

    dispatch({
      type: TOGGLE_WISHLIST_SUCCESS,
      payload: data.wishlist,
    });
    
    // Refresh wishlist
    dispatch(getWishlist());
  } catch (error) {
    dispatch({
      type: TOGGLE_WISHLIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
