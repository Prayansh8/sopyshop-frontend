import axios from "axios";
import {
  ALL_CATEGORIES_REQUEST,
  ALL_CATEGORIES_SUCCESS,
  ALL_CATEGORIES_FAILURE,
  CLEAR_ERRORS,
} from "../constants/categoryConstant";
import { config } from "../config";

// Get all categories
export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CATEGORIES_REQUEST });

    const { data } = await axios.get(`${config.baseUrl}/api/v1/categories`);

    dispatch({
      type: ALL_CATEGORIES_SUCCESS,
      payload: data.categories,
    });
  } catch (error) {
    dispatch({
      type: ALL_CATEGORIES_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Clear errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
