import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./redux-toolkit/cart/cartSlice";

export const storeReducer = {
  cart: cartSlice,
}

export const store = configureStore({
  reducer: storeReducer
});