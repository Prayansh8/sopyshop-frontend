import axios from "axios";
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
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

// clear error
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
