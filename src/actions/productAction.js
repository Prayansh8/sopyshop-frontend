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
  NEW_PRODUCTS_REQUEST,
  NEW_PRODUCTS_SUCCESS,
  NEW_PRODUCTS_FAILURE,
} from "../constants/productConstant";
import { config } from "../config";

// get all products

export const getProducts = (
  keyword = "",
  price = [0, 25000],
  currentPage = 1,
  category
) => {
  return async (dispatch) => {
    dispatch({ type: GET_PRODUCTS_REQUEST });

    let link = `${config.baseUrl}/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&page=${currentPage}`;

    if (category) {
      link = `${config.baseUrl}/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&page=${currentPage}&category=${category}`;
    }
    await axios
      .get(link)
      .then((response) => {
        dispatch({
          type: GET_PRODUCTS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_PRODUCTS_FAILURE,
          payload: error.response.data.message,
        });
      });
  };
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

const getProductDetailsRequest = () => {
  return {
    type: PRODUCTS_DETAILS_REQUEST,
  };
};

const getProductsDetailsSuccess = (product) => {
  return {
    type: PRODUCTS_DETAILS_SUCCESS,
    payload: product,
  };
};

const getProductsDetailsFailure = (error) => {
  return {
    type: PRODUCTS_DETAILS_FAILURE,
    payload: error,
  };
};

export const getProductDetails = (id) => {
  return async (dispatch) => {
    dispatch(getProductDetailsRequest(id));
    await axios
      .get(`${config.baseUrl}/api/v1/product/${id}`)
      .then((response) => {
        const product = response.data.product;
        dispatch(getProductsDetailsSuccess(product));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(getProductsDetailsFailure(errorMessage));
      });
  };
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
