import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./redux-toolkit/cart/cartSlice";
import ordersSlice from "./redux-toolkit/orders/ordersSlice";

export const storeReducer = {
  cart: cartSlice,
  orders: ordersSlice,
}

export const store = configureStore({
  reducer: storeReducer
});