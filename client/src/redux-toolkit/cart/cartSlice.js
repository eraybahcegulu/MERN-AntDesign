import { createSlice } from "@reduxjs/toolkit";
// Redux Toolkit ile redux slice oluşturuldu,
// başlangıç durumu(initial state)
// initial state i güncelleyen reducer fonksiyonları oluşturuldu
// add product, remove product, increase, decrease, reset cart
// sepet slice ı dışa aktarılarak reducerslarımız kullanılabilir hale getirildi
// dispatch halinde ilgili reducer ile sepet state içeriğini güncelleme

const initialState = {
  
  cartProducts: [],
  subTotal: 0,
  tax: 10,

  /* for Local Storage (app.jsx)
  cartProducts: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")).cartProducts
    : [],
  subTotal: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")).subTotal
    : 0,
  tax: 10, */
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addProduct: (state, action) => {
      const findCartProduct = state.cartProducts.find(
        (cartProduct) => cartProduct._id === action.payload._id
      );

      if (findCartProduct) {
        findCartProduct.quantity = findCartProduct.quantity + 1;
      } else {
        state.cartProducts.push(action.payload);
      }
      state.subTotal += action.payload.price;
    },

    removeProduct: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (cartProduct) => cartProduct._id !== action.payload._id
      );
      state.subTotal -= action.payload.price * action.payload.quantity;
    },

    increase: (state, action) => {
      const cartProduct = state.cartProducts.find(
        (cartProduct) => cartProduct._id === action.payload._id
      );
      cartProduct.quantity += 1;
      state.subTotal += cartProduct.price;
    },

    decrease: (state, action) => {
      const cartProduct = state.cartProducts.find(
        (cartProduct) => cartProduct._id === action.payload._id
      );
      cartProduct.quantity -= 1;
      state.subTotal -= cartProduct.price;
    },

    reset: (state) => {
      state.cartProducts = initialState.cartProducts;
      state.subTotal = initialState.subTotal;
    },
  },
});

export const { addProduct, removeProduct, increase, decrease, reset } = cartSlice.actions;
export default cartSlice.reducer;