import axios from "axios";

import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAILURE,
  PRODUCTS_DETAILS_REQUEST,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_DETAILS_FAILURE,
  DELETE_PRODUCTS_REQUEST,
  DELETE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_FAILURE,
  UPDATE_PRODUCTS_REQUEST,
  UPDATE_PRODUCTS_SUCCESS,
  UPDATE_PRODUCTS_FAILURE,
  NEW_PRODUCTS_REQUEST,
  NEW_PRODUCTS_SUCCESS,
  NEW_PRODUCTS_FAILURE,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAILURE,
  CLEAR_ERRORS,
} from "../constants/productConstant";
import { config } from "../config";

// get all products
export const getProducts =
  (keyword = "", price = [0, 150000], currentPage = 1, category) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_PRODUCTS_REQUEST });

      let link = `${config.baseUrl}/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&page=${currentPage}`;

      if (category) {
        link = `${config.baseUrl}/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&page=${currentPage}&category=${category}`;
      }

      const { data } = await axios.get(link);
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_PRODUCTS_FAILURE,
        payload: error.response.data.message,
      });
    }
  };

// get all product by admin
export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCTS_REQUEST });

    const token = localStorage.getItem("token");
    const configData = {
      headers: { authorization: `Bearer ${token}` },
    };

    const { data } = await axios.get(
      `${config.baseUrl}/api/v1/admin/products`,
      configData
    );

    dispatch({ type: ADMIN_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADMIN_PRODUCTS_FAILURE, payload: error.response.data });
  }
};

// Get Product Details

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_DETAILS_REQUEST });

    const { data } = await axios.get(`${config.baseUrl}/api/v1/product/${id}`);

    dispatch({ type: PRODUCTS_DETAILS_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({ type: PRODUCTS_DETAILS_FAILURE, payload: error.response.data });
  }
};

// create new product by admin
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCTS_REQUEST });

    const token = localStorage.getItem("token");
    const configData = {
      headers: { authorization: `Bearer ${token}` },
      "Constant-Type": "multipart/form-data",
    };

    const { data } = await axios.post(
      `${config.baseUrl}/api/v1/product/new`,
      productData,
      configData
    );

    dispatch({ type: NEW_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: NEW_PRODUCTS_FAILURE, payload: error.response.data });
  }
};

// Delete product by admin
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCTS_REQUEST });

    const token = localStorage.getItem("token");
    const configData = {
      headers: { authorization: `Bearer ${token}` },
    };

    const { data } = await axios.delete(
      `${config.baseUrl}/api/v1/product/delete/${id}`,
      configData
    );

    dispatch({ type: DELETE_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCTS_FAILURE, payload: error.response.data });
  }
};

// Update Product By Admin

export const adminUpdateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCTS_REQUEST });
    const token = localStorage.getItem("token");
    const configData = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.patch(
      `${config.baseUrl}/api/v1/product/update/${id}`,
      productData,
      configData
    );
    dispatch({ type: UPDATE_PRODUCTS_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCTS_FAILURE,
      payload: error.response.data,
    });
  }
};

// New Review

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const token = localStorage.getItem("token");
    const configData = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `${config.baseUrl}/api/v1/review`,
      reviewData,
      configData
    );

    dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: NEW_REVIEW_FAILURE, payload: error.response.data });
  }
};

// clear error
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
