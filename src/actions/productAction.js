import axios from "axios";

import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  PRODUCTS_DETAILS_REQUEST,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_DETAILS_FAILURE,
} from "../constants/productConstant";
import { config } from "../config";

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
