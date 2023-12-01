import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { CategoriesProvider } from "./contexts/CategoriesContext";
import { ProductsProvider } from "./contexts/ProductsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CategoriesProvider>
    <ProductsProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ProductsProvider>
  </CategoriesProvider>
);
