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
  NEW_PRODUCTS_REQUEST,
  NEW_PRODUCTS_SUCCESS,
  NEW_PRODUCTS_FAILURE,
  NEW_PRODUCTS_RESET,
  DELETE_PRODUCTS_REQUEST,
  DELETE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_FAILURE,
  DELETE_PRODUCTS_RESET,
  UPDATE_PRODUCTS_REQUEST,
  UPDATE_PRODUCTS_SUCCESS,
  UPDATE_PRODUCTS_FAILURE,
  UPDATE_PRODUCTS_RESET,
  CLEAR_ERRORS,
} from "../constants/productConstant";

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
    case ADMIN_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resultPerPage: action.payload.results,
      };
    case ADMIN_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
      };
    case GET_PRODUCTS_FAILURE:
    case ADMIN_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload.message };
    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};
// create Product
export const newProductsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case NEW_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case NEW_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };
    case NEW_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload.message };
    case NEW_PRODUCTS_RESET:
      return { ...state, success: false };
    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};
// get product details
export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCTS_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PRODUCTS_DETAILS_SUCCESS:
      return {
        product: action.payload,
        loading: false,
      };
    case PRODUCTS_DETAILS_FAILURE:
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
// delete product
export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleteded: true,
      };
    case DELETE_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case DELETE_PRODUCTS_RESET:
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

// Product Update By Admin
export const updateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCTS_REQUEST:
      return { ...state, loding: true };
    case UPDATE_PRODUCTS_SUCCESS:
      return {
        ...state,
        loding: false,
        isUpdated: action.payload,
      };
    case UPDATE_PRODUCTS_FAILURE:
      return {
        ...state,
        loding: false,
        error: action.payload.message,
      };
    case UPDATE_PRODUCTS_RESET:
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
