import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  deleteProductReducer,
  newProductsReducer,
  newReviewReducer,
  productDetailsReducer,
  productsReducer,
  updateProductReducer,
} from "./reducers/productReducer";
import {
  getAllUsersReducer,
  loadUserReducer,
  updateReducer,
  updateUserReducer,
  userDetailsReducer,
  userReducer,
  deleteUserReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  deleteOrderReducer,
  getAllOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  singleOrderReducer,
  updateOrderReducer,
} from "./reducers/orderReducer";
import { wishlistReducer } from "./reducers/wishlistReducer";
import { categoryReducer, newCategoryReducer, updateDeleteCategoryReducer } from "./reducers/categoryReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  loadUser: loadUserReducer,
  update: updateReducer,
  cart: cartReducer,
  newProducts: newProductsReducer,
  deleteProduct: deleteProductReducer,
  getAllUsers: getAllUsersReducer,
  updateProduct: updateProductReducer,
  updateUser: updateUserReducer,
  userDetails: userDetailsReducer,
  profile: deleteUserReducer,
  newOrder: newOrderReducer,
  singleOrder: singleOrderReducer,
  orders: getAllOrdersReducer,
  myOrders: myOrdersReducer,
  newReview: newReviewReducer,
  updateOrder: updateOrderReducer,
  deleteOrder: deleteOrderReducer,
  wishlist: wishlistReducer,
  categories: categoryReducer,
  newCategory: newCategoryReducer,
  categoryOperation: updateDeleteCategoryReducer,
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
