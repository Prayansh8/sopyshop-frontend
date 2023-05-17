import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  deleteProductReducer,
  newProductsReducer,
  productDetailsReducer,
  productsReducer,
  updateProductReducer,
} from "./reducers/productReducer";
import {
  getAllUsersReducer,
  getUserReducer,
  loadUserReducer,
  updateUserReducer,
  userReducer,
} from "./reducers/userReducer";
import { update } from "./actions/userAction";
import { cartReducer } from "./reducers/cartReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  loadUser: loadUserReducer,
  update: update,
  cart: cartReducer,
  newProducts: newProductsReducer,
  deleteProduct: deleteProductReducer,
  getAllUsers: getAllUsersReducer,
  updateProduct: updateProductReducer,
  getUser: getUserReducer,
  updateUser: updateUserReducer,
});

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : [],
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
