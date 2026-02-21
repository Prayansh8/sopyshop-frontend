import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
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
  UPDATE_ORDER_RESET,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  DELETE_ORDER_RESET,
  CLEAR_ERRORS,
} from "../constants/orderConstant";

// create order
export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case CREATE_ORDER_FAILURE:
      return {
        loading: true,
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

// get all orders

export const getAllOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_All_ORDERS_REQUEST:
      return { ...state, loading: true };
    case GET_All_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload.orders,
        totalAmount: action.payload.totalAmount,
      };
    case GET_All_ORDERS_FAILURE:
      return { ...state, loading: false, error: action.payload.message };
    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

// get single order

export const singleOrderReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case GET_ORDER_SUCCESS:
      return {
        order: action.payload.order,
        loading: false,
      };
    case GET_ORDER_FAILURE:
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

// get my orders

export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDER_REQUEST:
      return {
        loading: true,
      };
    case MY_ORDER_SUCCESS:
      return {
        orders: action.payload.orders,
        loading: false,
      };
    case MY_ORDER_FAILURE:
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

//  Update Order

export const updateOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
      return { ...state, loding: true };
    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loding: false,
        isUpdated: action.payload,
      };
    case UPDATE_ORDER_FAILURE:
      return {
        ...state,
        loding: false,
        error: action.payload.message,
      };
    case UPDATE_ORDER_RESET:
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

// Delete Order

export const deleteOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleteded: true,
      };
    case DELETE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case DELETE_ORDER_RESET:
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
