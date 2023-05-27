import axios from "axios";
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_All_ORDERS_REQUEST,
  GET_All_ORDERS_SUCCESS,
  GET_All_ORDERS_FAILURE,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILURE,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAILURE,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAILURE,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  CLEAR_ERRORS,
} from "../constants/orderConstant";
import { config } from "../config";

//   Create Order
export const createOrder = (order) => async (dispatch) => {
  console.log(order);
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const token = localStorage.getItem("token");
    const configData = {
      headers: { authorization: `Bearer ${token}` },
      "Content-Type": "application/json",
    };

    const { data } = await axios.post(
      `${config.baseUrl}/api/v1/order/new`,
      order,
      configData
    );

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: error.response.data.message,
    });
  }
};

// get My Orders
export const getMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDER_REQUEST });

    const token = localStorage.getItem("token");
    const configData = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `${config.baseUrl}/api/v1/my/orders`,
      configData
    );
    dispatch({ type: MY_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MY_ORDER_FAILURE,
      payload: error.response.data.message,
    });
  }
};

// get all Orders
export const getAllOrdersByAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: GET_All_ORDERS_REQUEST });

    const token = localStorage.getItem("token");
    const configData = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `${config.baseUrl}/api/v1/admin/orders`,
      configData
    );
    dispatch({ type: GET_All_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_All_ORDERS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

// get single Orders
export const getSingleOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDER_REQUEST });

    const token = localStorage.getItem("token");
    const configData = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `${config.baseUrl}/api/v1/order/${id}`,
      configData
    );
    dispatch({ type: GET_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ORDER_FAILURE,
      payload: error.response.data.message,
    });
  }
};

// Update Order By Admin

export const adminUpdateOrder = (id, orderStatus) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });
    const token = localStorage.getItem("token");
    const configData = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `${config.baseUrl}/api/v1/admin/order/${id}`,
      orderStatus,
      configData
    );
    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAILURE,
      payload: error.response.data,
    });
  }
};

// Delete Order by admin
export const deleteOrderByAdmin = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const token = localStorage.getItem("token");
    const configData = {
      headers: { authorization: `Bearer ${token}` },
    };

    const { data } = await axios.delete(
      `${config.baseUrl}/api/v1/admin/order/${id}`,
      configData
    );

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_ORDER_FAILURE, payload: error.response.data });
  }
};

// clear error
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
